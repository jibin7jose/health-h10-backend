import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private buildUserResponse(user: any) {
    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

  // Generic token signer – can include extra fields like club_id
  private signToken(payload: { sub: string; email: string; role: string; [key: string]: any }) {
    return this.jwt.sign(payload);
  }

  // SUPER ADMIN REGISTER
  async register(dto: RegisterDto) {
    const existingAdmin = await this.prisma.superAdmin.findFirst();

    if (existingAdmin) {
      throw new BadRequestException(
        'Super Admin already exists. New registration is disabled.',
      );
    }

    const password_hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.superAdmin.create({
      data: {
        name: dto.name || null,
        email: dto.email,
        phone: dto.phone || null,
        password_hash,
        profile_image: null,
      },
    });

    const access_token = this.signToken({
      sub: user.super_admin_id,
      email: user.email,
      role: 'SUPER_ADMIN',
    });

    return {
      message: 'Super Admin created successfully',
      access_token,
      role: 'SUPER_ADMIN',
      user: this.buildUserResponse(user),
    };
  }

  // LOGIN (SUPER ADMIN + CLUB ADMIN + COACH)
  async login(dto: LoginDto) {
    // -------- SUPER ADMIN --------
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { email: dto.email },
    });

    if (superAdmin) {
      const valid = await bcrypt.compare(
        dto.password,
        superAdmin.password_hash,
      );

      if (!valid) throw new UnauthorizedException('Invalid password');

      const access_token = this.signToken({
        sub: superAdmin.super_admin_id,
        email: superAdmin.email,
        role: 'SUPER_ADMIN',
      });

      return {
        message: 'Login successful',
        access_token,
        role: 'SUPER_ADMIN',
        user: this.buildUserResponse(superAdmin),
      };
    }

    // -------- CLUB ADMIN --------
    const clubAdmin = await this.prisma.clubAdmin.findUnique({
      where: { email: dto.email },
    });

    if (clubAdmin) {
      const valid = await bcrypt.compare(
        dto.password,
        clubAdmin.password_hash,
      );

      if (!valid) throw new UnauthorizedException('Invalid password');

      const access_token = this.signToken({
        sub: clubAdmin.admin_id,
        email: clubAdmin.email!,
        role: 'CLUB_ADMIN',
        club_id: clubAdmin.club_id, // IMPORTANT: used later in coaches controller
      });

      return {
        message: 'Login successful',
        access_token,
        role: 'CLUB_ADMIN',
        user: this.buildUserResponse(clubAdmin),
      };
    }

    // -------- COACH --------
    const coach = await this.prisma.coach.findUnique({
      where: { email: dto.email },
    });

    if (coach) {
      const valid = await bcrypt.compare(
        dto.password,
        coach.password_hash!,
      );

      if (!valid) throw new UnauthorizedException('Invalid password');

      const access_token = this.signToken({
        sub: coach.coach_id,
        email: coach.email!,
        role: 'COACH',
        club_id: coach.club_id, // coach also has club_id
      });

      return {
        message: 'Login successful',
        access_token,
        role: 'COACH',
        user: this.buildUserResponse(coach),
      };
    }

    throw new UnauthorizedException('User not found');
  }

  // PROFILE FROM TOKEN (SUPER_ADMIN + CLUB_ADMIN + COACH)
  async getProfileFromToken(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing auth token');
    }

    const token = authHeader.split(' ')[1];

    let payload: any;
    try {
      payload = this.jwt.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    if (payload.role === 'SUPER_ADMIN') {
      const user = await this.prisma.superAdmin.findUnique({
        where: { super_admin_id: payload.sub },
        select: {
          super_admin_id: true,
          name: true,
          email: true,
          phone: true,
        },
      });

      return { role: 'SUPER_ADMIN', user };
    }

    if (payload.role === 'CLUB_ADMIN') {
      const user = await this.prisma.clubAdmin.findUnique({
        where: { admin_id: payload.sub },
        select: {
          admin_id: true,
          name: true,
          email: true,
          phone: true,
          club_id: true,
        },
      });

      return { role: 'CLUB_ADMIN', user };
    }

    if (payload.role === 'COACH') {
      const user = await this.prisma.coach.findUnique({
        where: { coach_id: payload.sub },
        select: {
          coach_id: true,
          coach_name: true,
          email: true,
          phone: true,
          club_id: true,
        },
      });

      return { role: 'COACH', user };
    }

    throw new UnauthorizedException('Invalid role');
  }
}
