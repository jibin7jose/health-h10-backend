import { AssignmentsService } from './assignments.service';
import { AssignCoachPodPlayerDto } from './dto/assign-coach-pod-player.dto';
export declare class AssignmentsController {
    private svc;
    constructor(svc: AssignmentsService);
    assign(dto: AssignCoachPodPlayerDto): import("@prisma/client").Prisma.Prisma__CoachAssignmentClient<{
        coach_id: string | null;
        assignment_id: string;
        pod_id: string | null;
        pod_holder_id: string | null;
        player_id: string | null;
        assigned_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        coach_id: string | null;
        assignment_id: string;
        pod_id: string | null;
        pod_holder_id: string | null;
        player_id: string | null;
        assigned_at: Date;
    }[]>;
}
