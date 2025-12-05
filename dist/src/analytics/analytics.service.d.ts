import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    playerSummary(player_id: string): Promise<{
        player_id: string;
        total_distance_last7: number;
        samples: number;
    }>;
}
