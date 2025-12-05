import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
export declare class ServiceRequestsController {
    private svc;
    constructor(svc: ServiceRequestsService);
    create(dto: CreateServiceRequestDto): import("@prisma/client").Prisma.Prisma__ServiceRequestClient<{
        created_at: Date;
        updated_at: Date;
        club_id: string | null;
        status: string | null;
        request_id: string;
        requester_id: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        updated_at: Date;
        club_id: string | null;
        status: string | null;
        request_id: string;
        requester_id: string | null;
        description: string | null;
    }[]>;
}
