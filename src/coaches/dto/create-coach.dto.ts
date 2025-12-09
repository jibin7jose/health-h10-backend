import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateCoachDto {
  @IsString()
  coach_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(6)
  password: string;
}
