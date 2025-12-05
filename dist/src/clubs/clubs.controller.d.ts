import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
export declare class ClubsController {
    private svc;
    constructor(svc: ClubsService);
    create(dto: CreateClubDto): import("@prisma/client").Prisma.Prisma__ClubClient<{
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
