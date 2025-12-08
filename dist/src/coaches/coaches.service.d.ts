import { PrismaService } from '../prisma/prisma.service';
export declare class CoachesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): import("@prisma/client").Prisma.Prisma__CoachClient<{
        email: string | null;
        phone: string | null;
        password_hash: string | null;
        created_at: Date;
        updated_at: Date;
        role: string | null;
        club_id: string;
        coach_id: string;
        coach_name: string | null;
        coach_image: string | null;
        location: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string | null;
        phone: string | null;
        password_hash: string | null;
        created_at: Date;
        updated_at: Date;
        role: string | null;
        club_id: string;
        coach_id: string;
        coach_name: string | null;
        coach_image: string | null;
        location: string | null;
    }[]>;
}
