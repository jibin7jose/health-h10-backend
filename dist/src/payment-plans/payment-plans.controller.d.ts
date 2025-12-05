import { PaymentPlansService } from './payment-plans.service';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
export declare class PaymentPlansController {
    private readonly service;
    constructor(service: PaymentPlansService);
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
