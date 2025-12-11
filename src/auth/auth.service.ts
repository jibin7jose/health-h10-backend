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

  // Clean user before sending out
  private buildUserResponse(user: any) {
    const {
      password_hash,
      reset_token,
      reset_token_expires,
      login_otp,
      login_otp_expires,
      ...safe
    } = user;
    return safe;
  }

  private signToken(payload: { sub: string; email: string; role: string }) {
    return this.jwt.sign(payload);
  }

  // REGISTER SUPER ADMIN
  async register(dto: RegisterDto) {
    const existingAdmin = await this.prisma.superAdmin.findFirst();
    if (existingAdmin) {
      throw new BadRequestException('Super Admin already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.superAdmin.create({
      data: {
        name: dto.name || null,
        email: dto.email,
        phone: dto.phone || null,
        password_hash: hash,
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

  // LOGIN → SEND OTP
// LOGIN → SEND OTP
async login(dto: LoginDto) {
  const user =
    (await this.prisma.superAdmin.findUnique({ where: { email: dto.email } })) ||
    (await this.prisma.clubAdmin.findUnique({ where: { email: dto.email } })) ||
    (await this.prisma.coach.findUnique({ where: { email: dto.email } }));

  if (!user) throw new UnauthorizedException('User not found');

  const valid = await bcrypt.compare(dto.password, user.password_hash);
  if (!valid) throw new UnauthorizedException('Invalid password');

  // Create OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  // Identify model
  let model, idField, idValue;

  if ('super_admin_id' in user) {
    model = this.prisma.superAdmin;
    idField = 'super_admin_id';
    idValue = user.super_admin_id;
  } else if ('admin_id' in user) {
    model = this.prisma.clubAdmin;
    idField = 'admin_id';
    idValue = user.admin_id;
  } else {
    model = this.prisma.coach;
    idField = 'coach_id';
    idValue = user.coach_id;
  }

  await model.update({
    where: { [idField]: idValue },
    data: {
      login_otp: otp,
      login_otp_expires: expires,
    },
  });

  await this.mailService.sendLoginOtpEmail(user.email!, otp);

  // ⭐⭐ FIXED RESPONSE ⭐⭐
  return {
    needOtp: true,
    email: user.email,
    message: "OTP sent to email"
  };
}


  // VERIFY LOGIN OTP
  async verifyLoginOtp(email: string, otp: string) {
    const now = new Date();

    const user =
      (await this.prisma.superAdmin.findFirst({
        where: { email, login_otp: otp, login_otp_expires: { gt: now } },
      })) ||
      (await this.prisma.clubAdmin.findFirst({
        where: { email, login_otp: otp, login_otp_expires: { gt: now } },
      })) ||
      (await this.prisma.coach.findFirst({
        where: { email, login_otp: otp, login_otp_expires: { gt: now } },
      }));

    if (!user) throw new UnauthorizedException('Invalid or expired OTP');

    let role: string;
    let model: any;
    let idField: string;
    let idValue: string;

    if ('super_admin_id' in user) {
      role = 'SUPER_ADMIN';
      model = this.prisma.superAdmin;
      idField = 'super_admin_id';
      idValue = user.super_admin_id;
    } else if ('admin_id' in user) {
      role = 'CLUB_ADMIN';
      model = this.prisma.clubAdmin;
      idField = 'admin_id';
      idValue = user.admin_id;
    } else {
      role = 'COACH';
      model = this.prisma.coach;
      idField = 'coach_id';
      idValue = user.coach_id;
    }

    // Clear OTP
    await model.update({
      where: { [idField]: idValue },
      data: {
        login_otp: null,
        login_otp_expires: null,
      },
    });

    // Return JWT (FIXED email!)
    const token = this.signToken({
      sub: idValue,
      email: user.email!, // FIX
      role,
    });

    return {
      message: 'Login successful',
      access_token: token,
      role,
      user: this.buildUserResponse(user),
    };
  }

  // PROFILE
  async getProfileFromToken(authHeader: string) {
    if (!authHeader?.startsWith('Bearer '))
      throw new UnauthorizedException('Missing token');

    const token = authHeader.split(' ')[1];
    const payload = this.jwt.verify(token) as { sub: string; role: string };

    if (payload.role === 'SUPER_ADMIN') {
      return {
        role: 'SUPER_ADMIN',
        user: await this.prisma.superAdmin.findUnique({
          where: { super_admin_id: payload.sub },
        }),
      };
    }

    if (payload.role === 'CLUB_ADMIN') {
      return {
        role: 'CLUB_ADMIN',
        user: await this.prisma.clubAdmin.findUnique({
          where: { admin_id: payload.sub },
        }),
      };
    }

    return {
      role: 'COACH',
      user: await this.prisma.coach.findUnique({
        where: { coach_id: payload.sub },
      }),
    };
  }

  // FORGOT PASSWORD
  async forgotPassword(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    const user =
      (await this.prisma.superAdmin.findUnique({ where: { email } })) ||
      (await this.prisma.clubAdmin.findUnique({ where: { email } })) ||
      (await this.prisma.coach.findUnique({ where: { email } }));

    if (!user) return { message: 'If email exists, OTP sent' };

    let model: any;
    let idField: string;
    let idValue: string;

    if ('super_admin_id' in user) {
      model = this.prisma.superAdmin;
      idField = 'super_admin_id';
      idValue = user.super_admin_id;
    } else if ('admin_id' in user) {
      model = this.prisma.clubAdmin;
      idField = 'admin_id';
      idValue = user.admin_id;
    } else {
      model = this.prisma.coach;
      idField = 'coach_id';
      idValue = user.coach_id;
    }

    await model.update({
      where: { [idField]: idValue },
      data: { reset_token: otp, reset_token_expires: expires },
    });

    await this.mailService.sendResetPasswordEmail(email, otp);

    return { message: 'OTP sent to email' };
  }

  // RESET PASSWORD
  async resetPassword(token: string, newPassword: string) {
    const now = new Date();

    const user =
      (await this.prisma.superAdmin.findFirst({
        where: { reset_token: token, reset_token_expires: { gt: now } },
      })) ||
      (await this.prisma.clubAdmin.findFirst({
        where: { reset_token: token, reset_token_expires: { gt: now } },
      })) ||
      (await this.prisma.coach.findFirst({
        where: { reset_token: token, reset_token_expires: { gt: now } },
      }));

    if (!user) throw new BadRequestException('Invalid or expired OTP');

    const hashed = await bcrypt.hash(newPassword, 10);

    let model: any;
    let idField: string;
    let idValue: string;

    if ('super_admin_id' in user) {
      model = this.prisma.superAdmin;
      idField = 'super_admin_id';
      idValue = user.super_admin_id;
    } else if ('admin_id' in user) {
      model = this.prisma.clubAdmin;
      idField = 'admin_id';
      idValue = user.admin_id;
    } else {
      model = this.prisma.coach;
      idField = 'coach_id';
      idValue = user.coach_id;
    }

    await model.update({
      where: { [idField]: idValue },
      data: {
        password_hash: hashed,
        reset_token: null,
        reset_token_expires: null,
      },
    });

    return { message: 'Password updated successfully' };
  }
}
