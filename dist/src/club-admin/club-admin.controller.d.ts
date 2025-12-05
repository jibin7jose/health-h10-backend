import { ClubAdminService } from './club-admin.service';
import { CreateClubAdminDto } from './dto/create-club-admin.dto';
export declare class ClubAdminController {
    private svc;
    constructor(svc: ClubAdminService);
    create(dto: CreateClubAdminDto): Promise<{
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
