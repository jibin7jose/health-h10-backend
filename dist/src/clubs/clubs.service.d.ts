import { PrismaService } from '../prisma/prisma.service';
export declare class ClubsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(super_admin_id: string, dto: any): Promise<{
        message: string;
        club: {
            super_admin_id: string | null;
            created_at: Date;
            updated_at: Date;
            club_id: string;
            club_name: string | null;
            address: string | null;
            sport: string | null;
            status: string | null;
        };
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        club_admins: {
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
        }[];
    } & {
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        sport: string | null;
        status: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ClubClient<({
        club_admins: {
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
        }[];
    } & {
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        sport: string | null;
        status: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
