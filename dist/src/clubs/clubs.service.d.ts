import { PrismaService } from '../prisma/prisma.service';
export declare class ClubsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(super_admin_id: string | null, dto: any): import("@prisma/client").Prisma.Prisma__ClubClient<{
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        status: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        status: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ClubClient<{
        super_admin_id: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        club_name: string | null;
        address: string | null;
        status: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
