import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsController {
    private svc;
    constructor(svc: SubscriptionsService);
    create(dto: CreateSubscriptionDto): Promise<{
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
