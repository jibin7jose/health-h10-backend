import { PrismaService } from '../prisma/prisma.service';
export declare class CoachesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: {
        coach_name: string;
        email: string;
        password: string;
        phone?: string;
        club_id: string;
    }): Promise<{
        email: string | null;
        phone: string | null;
        password_hash: string | null;
        reset_token: string | null;
        reset_token_expires: Date | null;
        login_otp: string | null;
        login_otp_expires: Date | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        coach_id: string;
        coach_name: string | null;
        role: string | null;
        coach_image: string | null;
        location: string | null;
    }>;
    findByClub(club_id: string): Promise<{
        email: string | null;
        phone: string | null;
        password_hash: string | null;
        reset_token: string | null;
        reset_token_expires: Date | null;
        login_otp: string | null;
        login_otp_expires: Date | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        coach_id: string;
        coach_name: string | null;
        role: string | null;
        coach_image: string | null;
        location: string | null;
    }[]>;
    assignPodHolder(coach_id: string, pod_holder_id: string): Promise<{
        coach_id: string | null;
        assignment_id: string;
        pod_id: string | null;
        pod_holder_id: string | null;
        player_id: string | null;
        assigned_at: Date;
    }>;
}
