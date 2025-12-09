import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  club_name: string;

  @IsString()
  address: string;

  @IsString()
  sport: string;

  // ✅ CLUB ADMIN
  @IsString()
  admin_name: string;

  @IsEmail()
  admin_email: string;

  @MinLength(6)
  admin_password: string;

  // ✅ OPTIONAL POD HOLDER
  @IsOptional()
  @IsString()
  pod_holder_id?: string;
}
