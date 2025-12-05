import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
export declare class PaymentPlansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePaymentPlanDto): Promise<{
        name: string | null;
        created_at: Date;
        plan_id: string;
        description: string | null;
        price_cents: number | null;
        duration_days: number | null;
    }>;
    findAll(): Promise<{
        name: string | null;
        created_at: Date;
        plan_id: string;
        description: string | null;
        price_cents: number | null;
        duration_days: number | null;
    }[]>;
}
