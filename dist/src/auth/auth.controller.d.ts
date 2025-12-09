import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
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
        message: string;
        access_token: string;
        role: string;
        user: any;
    }>;
    profile(authHeader: string): Promise<{
        role: string;
        user: {
            super_admin_id: string;
            email: string;
            name: string | null;
            phone: string | null;
        } | null;
    } | {
        role: string;
        user: {
            email: string | null;
            name: string | null;
            phone: string | null;
            admin_id: string;
            club_id: string;
        } | null;
    } | {
        role: string;
        user: {
            email: string | null;
            phone: string | null;
            club_id: string;
            coach_id: string;
            coach_name: string | null;
        } | null;
    }>;
}
