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
        email: string;
        name: string | null;
        phone: string | null;
    }>;
}
