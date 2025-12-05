import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private svc;
    constructor(svc: AnalyticsService);
    playerSummary(player_id: string): Promise<{
        player_id: string;
        total_distance_last7: number;
        samples: number;
    }>;
}
