import { PrismaService } from '../prisma/prisma.service';
export declare class ClubAdminService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
        email: string | null;
        name: string | null;
        phone: string | null;
        password_hash: string | null;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        admin_id: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string | null;
        name: string | null;
        phone: string | null;
        password_hash: string | null;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        admin_id: string;
    }[]>;
}
