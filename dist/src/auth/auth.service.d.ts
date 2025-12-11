import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private prisma;
    private jwt;
    private mailService;
    constructor(prisma: PrismaService, jwt: JwtService, mailService: MailService);
    private buildUserResponse;
    private signToken;
    register(dto: RegisterDto): Promise<{
        message: string;
        access_token: string;
        role: string;
        user: any;
    }>;
    login(dto: LoginDto): Promise<{
        needOtp: boolean;
        email: string | null;
        message: string;
    }>;
    verifyLoginOtp(email: string, otp: string): Promise<{
        message: string;
        access_token: string;
        role: string;
        user: any;
    }>;
    getProfileFromToken(authHeader: string): Promise<{
        role: string;
        user: {
            super_admin_id: string;
            email: string;
            name: string | null;
            phone: string | null;
            password_hash: string;
            profile_image: string | null;
            reset_token: string | null;
            reset_token_expires: Date | null;
            login_otp: string | null;
            login_otp_expires: Date | null;
            created_at: Date;
            updated_at: Date;
        } | null;
    } | {
        role: string;
        user: {
            email: string | null;
            name: string | null;
            phone: string | null;
            password_hash: string | null;
            profile_image: string | null;
            reset_token: string | null;
            reset_token_expires: Date | null;
            login_otp: string | null;
            login_otp_expires: Date | null;
            created_at: Date;
            updated_at: Date;
            admin_id: string;
            club_id: string;
        } | null;
    } | {
        role: string;
        user: {
            email: string | null;
            phone: string | null;
            password_hash: string | null;
            reset_token: string | null;
            reset_token_expires: Date | null;
            login_otp: string | null;
            login_otp_expires: Date | null;
            created_at: Date;
            updated_at: Date;
            club_id: string;
            coach_id: string;
            coach_name: string | null;
            role: string | null;
            coach_image: string | null;
            location: string | null;
        } | null;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
