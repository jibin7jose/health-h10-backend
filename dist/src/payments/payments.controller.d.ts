import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private svc;
    constructor(svc: PaymentsService);
    create(dto: CreatePaymentDto): Promise<{
        payment_id: string;
        amount_cents: number | null;
        paid_at: Date;
        method: string | null;
        transaction_ref: string | null;
        subscription_id: string;
    }>;
    findAll(): Promise<{
        payment_id: string;
        amount_cents: number | null;
        paid_at: Date;
        method: string | null;
        transaction_ref: string | null;
        subscription_id: string;
    }[]>;
}
