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

  private signToken(userId: string, email: string, role: string) {
    return this.jwt.sign({ sub: userId, email, role });
  }

  // ✅ ONLY ONE SUPER ADMIN ALLOWED
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

    const access_token = this.signToken(
      user.super_admin_id,
      user.email,
      'SUPER_ADMIN',
    );

    return {
      message: 'Super Admin created successfully',
      access_token,
      role: 'SUPER_ADMIN',
      user: this.buildUserResponse(user),
    };
  }

  // ✅ LOGIN
  async login(dto: LoginDto) {
    const user = await this.prisma.superAdmin.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValid = await bcrypt.compare(dto.password, user.password_hash);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const access_token = this.signToken(
      user.super_admin_id,
      user.email,
      'SUPER_ADMIN',
    );

    return {
      message: 'Login successful',
      access_token,
      role: 'SUPER_ADMIN',
      user: this.buildUserResponse(user),
    };
  }

  // ✅ PROFILE FOR NAVBAR (FROM JWT)
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

    const user = await this.prisma.superAdmin.findUnique({
      where: { super_admin_id: payload.sub },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
