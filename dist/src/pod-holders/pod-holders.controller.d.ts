import { PodHoldersService } from './pod-holders.service';
import { CreatePodHolderDto } from './dto/create-pod-holder.dto';
export declare class PodHoldersController {
    private readonly service;
    constructor(service: PodHoldersService);
    create(dto: CreatePodHolderDto): import("@prisma/client").Prisma.Prisma__PodHolderClient<{
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
