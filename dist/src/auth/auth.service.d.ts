import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    login(email: string, password: string): Promise<{
        message: string;
        role: string;
        userId: string;
    }>;
}
