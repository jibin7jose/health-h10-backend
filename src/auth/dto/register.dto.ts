// src/auth/dto/register.dto.ts
import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  CLUB_ADMIN = 'club_admin',
  COACH = 'coach',
}

export class RegisterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)   // ✅ ensures role is one of these values
  role: UserRole;

  @IsOptional()
  @IsString()
  clubId?: string;  // needed for club_admin/coach
}
