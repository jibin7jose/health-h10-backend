import { PodsService } from './pods.service';
import { CreatePodDto } from './dto/create-pod.dto';
export declare class PodsController {
    private svc;
    constructor(svc: PodsService);
    create(dto: CreatePodDto): import("@prisma/client").Prisma.Prisma__PodClient<{
        created_at: Date;
        updated_at: Date;
        pod_id: string;
        serial_number: string | null;
        model: string | null;
        firmware: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        updated_at: Date;
        pod_id: string;
        serial_number: string | null;
        model: string | null;
        firmware: string | null;
    }[]>;
}
