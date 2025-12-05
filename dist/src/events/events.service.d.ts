import { PrismaService } from '../prisma/prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): import("@prisma/client").Prisma.Prisma__EventClient<{
        created_at: Date;
        club_id: string;
        location: string | null;
        event_id: string;
        event_name: string | null;
        event_date: Date | null;
        event_type: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        created_at: Date;
        club_id: string;
        location: string | null;
        event_id: string;
        event_name: string | null;
        event_date: Date | null;
        event_type: string | null;
    }[]>;
}
