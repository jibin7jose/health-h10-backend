import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: any): Promise<{
        message: string;
        access_token: string;
        role: string;
        user: any;
    }>;
    login(dto: any): Promise<{
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
            password_hash: string;
            profile_image: string | null;
            reset_token: string | null;
            reset_token_expires: Date | null;
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
