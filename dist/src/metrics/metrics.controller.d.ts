import { MetricsService } from './metrics.service';
import { CreateMetricsDto } from './dto/create-metrics.dto';
export declare class MetricsController {
    private svc;
    constructor(svc: MetricsService);
    create(dto: CreateMetricsDto): Promise<{
        id: string;
        player_id: string;
        total_distance: number | null;
        hsr_distance: number | null;
        sprint_distance: number | null;
        top_speed: number | null;
        sprint_count: number | null;
        acceleration: number | null;
        deceleration: number | null;
        max_acceleration: number | null;
        max_deceleration: number | null;
        player_load: number | null;
        power_score: number | null;
        hr_max: number | null;
        time_in_red_zone: number | null;
        percent_in_red_zone: number | null;
        hr_recovery_time: number | null;
        recorded_at: Date;
    }>;
    findByPlayer(player_id: string): Promise<{
        id: string;
        player_id: string;
        total_distance: number | null;
        hsr_distance: number | null;
        sprint_distance: number | null;
        top_speed: number | null;
        sprint_count: number | null;
        acceleration: number | null;
        deceleration: number | null;
        max_acceleration: number | null;
        max_deceleration: number | null;
        player_load: number | null;
        power_score: number | null;
        hr_max: number | null;
        time_in_red_zone: number | null;
        percent_in_red_zone: number | null;
        hr_recovery_time: number | null;
        recorded_at: Date;
    }[]>;
}
