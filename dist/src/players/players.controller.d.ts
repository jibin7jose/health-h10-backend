import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayersController {
    private svc;
    constructor(svc: PlayersService);
    create(dto: CreatePlayerDto): import("@prisma/client").Prisma.Prisma__PlayerClient<{
        phone: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        player_id: string;
        player_name: string | null;
        jersey_number: number | null;
        age: number | null;
        position: string | null;
        player_image: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        phone: string | null;
        created_at: Date;
        updated_at: Date;
        club_id: string;
        player_id: string;
        player_name: string | null;
        jersey_number: number | null;
        age: number | null;
        position: string | null;
        player_image: string | null;
    }[]>;
}
