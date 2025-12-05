import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
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
