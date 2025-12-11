import { SuperAdminService } from './super-admin.service';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
export declare class SuperAdminController {
    private svc;
    constructor(svc: SuperAdminService);
    create(dto: CreateSuperAdminDto): Promise<{
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
    }>;
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    } | null>;
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        url: string;
    }>;
}
