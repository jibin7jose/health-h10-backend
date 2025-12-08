import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    private buildUserResponse;
    private signToken;
    register(dto: RegisterDto): Promise<{
        message: string;
        access_token: string;
        role: string;
        user: any;
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        access_token: string;
        role: string;
        user: any;
    }>;
    getProfileFromToken(authHeader: string): Promise<{
        email: string;
        name: string | null;
        phone: string | null;
    }>;
}
