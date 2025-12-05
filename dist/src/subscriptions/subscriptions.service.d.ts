import { PrismaService } from '../prisma/prisma.service';
export declare class SubscriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
        created_at: Date;
        club_id: string;
        status: string | null;
        subscription_id: string;
        start_date: Date | null;
        end_date: Date | null;
        plan_id: string | null;
    }>;
    findAll(): Promise<{
        created_at: Date;
        club_id: string;
        status: string | null;
        subscription_id: string;
        start_date: Date | null;
        end_date: Date | null;
        plan_id: string | null;
    }[]>;
}
