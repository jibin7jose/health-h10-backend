import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
export declare class CoachesController {
    private svc;
    constructor(svc: CoachesService);
    create(dto: CreateCoachDto): import("@prisma/client").Prisma.Prisma__CoachClient<{
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
