import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    verifyLoginOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
        access_token: string;
        role: string;
        user: any;
    }>;
    profile(header: string): Promise<{
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
    forgot(email: string): Promise<{
        message: string;
    }>;
    reset(body: {
        token: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
}
