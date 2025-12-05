import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private svc;
    constructor(svc: EventsService);
    create(dto: CreateEventDto): import("@prisma/client").Prisma.Prisma__EventClient<{
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
