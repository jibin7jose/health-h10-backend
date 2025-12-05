import { PrismaService } from '../prisma/prisma.service';
export declare class ServiceRequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): import("@prisma/client").Prisma.Prisma__ServiceRequestClient<{
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
