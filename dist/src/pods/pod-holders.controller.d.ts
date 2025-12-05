import { PodHoldersService } from './pod-holders.service';
import { CreatePodHolderDto } from './dto/create-pod-holder.dto';
export declare class PodHoldersController {
    private svc;
    constructor(svc: PodHoldersService);
    create(dto: CreatePodHolderDto): Promise<{
        created_at: Date;
        updated_at: Date;
        serial_number: string | null;
        model: string | null;
        pod_holder_id: string;
    }>;
    findAll(): Promise<{
        created_at: Date;
        updated_at: Date;
        serial_number: string | null;
        model: string | null;
        pod_holder_id: string;
    }[]>;
    findOne(id: string): Promise<{
        created_at: Date;
        updated_at: Date;
        serial_number: string | null;
        model: string | null;
        pod_holder_id: string;
    }>;
    delete(id: string): Promise<{
        created_at: Date;
        updated_at: Date;
        serial_number: string | null;
        model: string | null;
        pod_holder_id: string;
    }>;
}
