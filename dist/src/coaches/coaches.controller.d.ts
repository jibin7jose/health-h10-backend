import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
export declare class CoachesController {
    private svc;
    constructor(svc: CoachesService);
    create(req: any, dto: CreateCoachDto): Promise<{
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
    }>;
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
    assign(body: {
        coach_id: string;
        pod_holder_id: string;
    }): Promise<{
        coach_id: string | null;
        assignment_id: string;
        pod_id: string | null;
        pod_holder_id: string | null;
        player_id: string | null;
        assigned_at: Date;
    }>;
}
