import { PrismaService } from '../prisma/prisma.service';
export declare class PodHoldersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        serial_number?: string;
        model?: string;
    }): import("@prisma/client").Prisma.Prisma__PodHolderClient<{
        created_at: Date;
        updated_at: Date;
        pod_holder_id: string;
        serial_number: string | null;
        model: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        updated_at: Date;
        pod_holder_id: string;
        serial_number: string | null;
        model: string | null;
    }[]>;
    findAvailable(): import("@prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        updated_at: Date;
        pod_holder_id: string;
        serial_number: string | null;
        model: string | null;
    }[]>;
    findOne(id: string): Promise<{
        created_at: Date;
        updated_at: Date;
        pod_holder_id: string;
        serial_number: string | null;
        model: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
