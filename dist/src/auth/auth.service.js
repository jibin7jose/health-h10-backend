"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    buildUserResponse(user) {
        const { password_hash, ...safeUser } = user;
        return safeUser;
    }
    signToken(userId, email, role) {
        return this.jwt.sign({ sub: userId, email, role });
    }
    async register(dto) {
        const existingAdmin = await this.prisma.superAdmin.findFirst();
        if (existingAdmin) {
            throw new common_1.BadRequestException('Super Admin already exists. New registration is disabled.');
        }
        const password_hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.superAdmin.create({
            data: {
                name: dto.name || null,
                email: dto.email,
                phone: dto.phone || null,
                password_hash,
                profile_image: null,
            },
        });
        const access_token = this.signToken(user.super_admin_id, user.email, 'SUPER_ADMIN');
        return {
            message: 'Super Admin created successfully',
            access_token,
            role: 'SUPER_ADMIN',
            user: this.buildUserResponse(user),
        };
    }
    async login(dto) {
        const user = await this.prisma.superAdmin.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isValid = await bcrypt.compare(dto.password, user.password_hash);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const access_token = this.signToken(user.super_admin_id, user.email, 'SUPER_ADMIN');
        return {
            message: 'Login successful',
            access_token,
            role: 'SUPER_ADMIN',
            user: this.buildUserResponse(user),
        };
    }
    async getProfileFromToken(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing auth token');
        }
        const token = authHeader.split(' ')[1];
        let payload;
        try {
            payload = this.jwt.verify(token);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const user = await this.prisma.superAdmin.findUnique({
            where: { super_admin_id: payload.sub },
            select: {
                name: true,
                email: true,
                phone: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map