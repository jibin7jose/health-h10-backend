import { PrismaService } from '../prisma/prisma.service';
export declare class SuperAdminService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
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
        created_at: Date;
        updated_at: Date;
    } | null>;
    updateProfileImage(id: string, filename: string): Promise<{
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
    }>;
}
