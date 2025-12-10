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
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailService: MailService,
  ) {}

  // ✅ REMOVE SENSITIVE FIELDS
  private buildUserResponse(user: any) {
    const { password_hash, reset_token, reset_token_expires, ...safeUser } =
      user;
    return safeUser;
  }

  private signToken(payload: { sub: string; email: string; role: string }) {
    return this.jwt.sign(payload);
  }

  // ✅ REGISTER
  async register(dto: RegisterDto) {
    const existingAdmin = await this.prisma.superAdmin.findFirst();
    if (existingAdmin) {
      throw new BadRequestException('Super Admin already exists');
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

    return {
      message: 'Super Admin created successfully',
      access_token: this.signToken({
        sub: user.super_admin_id,
        email: user.email,
        role: 'SUPER_ADMIN',
      }),
      role: 'SUPER_ADMIN',
      user: this.buildUserResponse(user),
    };
  }

  // ✅ LOGIN (3 ROLES)
  async login(dto: LoginDto) {
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { email: dto.email },
    });

    if (superAdmin) {
      const valid = await bcrypt.compare(dto.password, superAdmin.password_hash);
      if (!valid) throw new UnauthorizedException('Invalid password');

      return {
        message: 'Login successful',
        access_token: this.signToken({
          sub: superAdmin.super_admin_id,
          email: superAdmin.email,
          role: 'SUPER_ADMIN',
        }),
        role: 'SUPER_ADMIN',
        user: this.buildUserResponse(superAdmin),
      };
    }

    const clubAdmin = await this.prisma.clubAdmin.findUnique({
      where: { email: dto.email },
    });

    if (clubAdmin) {
      const valid = await bcrypt.compare(dto.password, clubAdmin.password_hash!);
      if (!valid) throw new UnauthorizedException('Invalid password');

      return {
        message: 'Login successful',
        access_token: this.signToken({
          sub: clubAdmin.admin_id,
          email: clubAdmin.email!,
          role: 'CLUB_ADMIN',
        }),
        role: 'CLUB_ADMIN',
        user: this.buildUserResponse(clubAdmin),
      };
    }

    const coach = await this.prisma.coach.findUnique({
      where: { email: dto.email },
    });

    if (coach) {
      const valid = await bcrypt.compare(dto.password, coach.password_hash!);
      if (!valid) throw new UnauthorizedException('Invalid password');

      return {
        message: 'Login successful',
        access_token: this.signToken({
          sub: coach.coach_id,
          email: coach.email!,
          role: 'COACH',
        }),
        role: 'COACH',
        user: this.buildUserResponse(coach),
      };
    }

    throw new UnauthorizedException('User not found');
  }

  // ✅ ✅ ✅ PROFILE API (FIXES YOUR ERROR 100%)
  async getProfileFromToken(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing auth token');
    }

    const token = authHeader.split(' ')[1];
    const payload = this.jwt.verify(token) as {
      sub: string;
      role: string;
    };

    if (payload.role === 'SUPER_ADMIN') {
      const user = await this.prisma.superAdmin.findUnique({
        where: { super_admin_id: payload.sub },
      });
      return { role: 'SUPER_ADMIN', user };
    }

    if (payload.role === 'CLUB_ADMIN') {
      const user = await this.prisma.clubAdmin.findUnique({
        where: { admin_id: payload.sub },
      });
      return { role: 'CLUB_ADMIN', user };
    }

    if (payload.role === 'COACH') {
      const user = await this.prisma.coach.findUnique({
        where: { coach_id: payload.sub },
      });
      return { role: 'COACH', user };
    }

    throw new UnauthorizedException('Invalid role');
  }

  // ✅ ✅ ✅ FORGOT PASSWORD — OTP SYSTEM
  async forgotPassword(email: string) {
    const otp = Math.random().toString(36).substring(2, 8).toUpperCase();

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);

    const admin =
      (await this.prisma.superAdmin.findUnique({ where: { email } })) ||
      (await this.prisma.clubAdmin.findUnique({ where: { email } })) ||
      (await this.prisma.coach.findUnique({ where: { email } }));

    if (!admin) {
      return { message: 'If email exists, OTP sent' };
    }

    const data = {
      reset_token: otp,
      reset_token_expires: expiry,
    };

    if ('super_admin_id' in admin) {
      await this.prisma.superAdmin.update({
        where: { super_admin_id: admin.super_admin_id },
        data,
      });
    } else if ('admin_id' in admin) {
      await this.prisma.clubAdmin.update({
        where: { admin_id: admin.admin_id },
        data,
      });
    } else {
      await this.prisma.coach.update({
        where: { coach_id: admin.coach_id },
        data,
      });
    }



    await this.mailService.sendResetPasswordEmail(email, otp);

    return { message: 'OTP sent to email' };
  }

  // ✅ ✅ ✅ RESET PASSWORD (OTP VERIFIED)
  async resetPassword(token: string, password: string) {
    const cleanToken = token.trim().toUpperCase();
    const now = new Date();



    const user =
      (await this.prisma.superAdmin.findFirst({
        where: {
          reset_token: cleanToken,
          reset_token_expires: { gt: now },
        },
      })) ||
      (await this.prisma.clubAdmin.findFirst({
        where: {
          reset_token: cleanToken,
          reset_token_expires: { gt: now },
        },
      })) ||
      (await this.prisma.coach.findFirst({
        where: {
          reset_token: cleanToken,
          reset_token_expires: { gt: now },
        },
      }));



    if (!user) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const hashed = await bcrypt.hash(password, 10);

    if ('super_admin_id' in user) {
      await this.prisma.superAdmin.update({
        where: { super_admin_id: user.super_admin_id },
        data: {
          password_hash: hashed,
          reset_token: null,
          reset_token_expires: null,
        },
      });
    } else if ('admin_id' in user) {
      await this.prisma.clubAdmin.update({
        where: { admin_id: user.admin_id },
        data: {
          password_hash: hashed,
          reset_token: null,
          reset_token_expires: null,
        },
      });
    } else {
      await this.prisma.coach.update({
        where: { coach_id: user.coach_id },
        data: {
          password_hash: hashed,
          reset_token: null,
          reset_token_expires: null,
        },
      });
    }



    return { message: 'Password updated successfully' };
  }
}
