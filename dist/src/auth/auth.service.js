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
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    prisma;
    jwt;
    mailService;
    constructor(prisma, jwt, mailService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.mailService = mailService;
    }
    buildUserResponse(user) {
        const { password_hash, reset_token, reset_token_expires, login_otp, login_otp_expires, ...safe } = user;
        return safe;
    }
    signToken(payload) {
        return this.jwt.sign(payload);
    }
    async register(dto) {
        const existingAdmin = await this.prisma.superAdmin.findFirst();
        if (existingAdmin) {
            throw new common_1.BadRequestException('Super Admin already exists');
        }
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.superAdmin.create({
            data: {
                name: dto.name || null,
                email: dto.email,
                phone: dto.phone || null,
                password_hash: hash,
            },
        });
        return {
            message: 'Super Admin created successfully',
            access_token: this.signToken({
                sub: user.super_admin_id,
                email: user.email,
                role: 'SUPER_ADMIN',
            }),
            role: 'SUPER_ADMIN',
            user: this.buildUserResponse(user),
        };
    }
    async login(dto) {
        const user = (await this.prisma.superAdmin.findUnique({ where: { email: dto.email } })) ||
            (await this.prisma.clubAdmin.findUnique({ where: { email: dto.email } })) ||
            (await this.prisma.coach.findUnique({ where: { email: dto.email } }));
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const valid = await bcrypt.compare(dto.password, user.password_hash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid password');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000);
        let model, idField, idValue;
        if ('super_admin_id' in user) {
            model = this.prisma.superAdmin;
            idField = 'super_admin_id';
            idValue = user.super_admin_id;
        }
        else if ('admin_id' in user) {
            model = this.prisma.clubAdmin;
            idField = 'admin_id';
            idValue = user.admin_id;
        }
        else {
            model = this.prisma.coach;
            idField = 'coach_id';
            idValue = user.coach_id;
        }
        await model.update({
            where: { [idField]: idValue },
            data: {
                login_otp: otp,
                login_otp_expires: expires,
            },
        });
        await this.mailService.sendLoginOtpEmail(user.email, otp);
        return {
            needOtp: true,
            email: user.email,
            message: "OTP sent to email"
        };
    }
    async verifyLoginOtp(email, otp) {
        const now = new Date();
        const user = (await this.prisma.superAdmin.findFirst({
            where: { email, login_otp: otp, login_otp_expires: { gt: now } },
        })) ||
            (await this.prisma.clubAdmin.findFirst({
                where: { email, login_otp: otp, login_otp_expires: { gt: now } },
            })) ||
            (await this.prisma.coach.findFirst({
                where: { email, login_otp: otp, login_otp_expires: { gt: now } },
            }));
        if (!user)
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        let role;
        let model;
        let idField;
        let idValue;
        if ('super_admin_id' in user) {
            role = 'SUPER_ADMIN';
            model = this.prisma.superAdmin;
            idField = 'super_admin_id';
            idValue = user.super_admin_id;
        }
        else if ('admin_id' in user) {
            role = 'CLUB_ADMIN';
            model = this.prisma.clubAdmin;
            idField = 'admin_id';
            idValue = user.admin_id;
        }
        else {
            role = 'COACH';
            model = this.prisma.coach;
            idField = 'coach_id';
            idValue = user.coach_id;
        }
        await model.update({
            where: { [idField]: idValue },
            data: {
                login_otp: null,
                login_otp_expires: null,
            },
        });
        const token = this.signToken({
            sub: idValue,
            email: user.email,
            role,
        });
        return {
            message: 'Login successful',
            access_token: token,
            role,
            user: this.buildUserResponse(user),
        };
    }
    async getProfileFromToken(authHeader) {
        if (!authHeader?.startsWith('Bearer '))
            throw new common_1.UnauthorizedException('Missing token');
        const token = authHeader.split(' ')[1];
        const payload = this.jwt.verify(token);
        if (payload.role === 'SUPER_ADMIN') {
            return {
                role: 'SUPER_ADMIN',
                user: await this.prisma.superAdmin.findUnique({
                    where: { super_admin_id: payload.sub },
                }),
            };
        }
        if (payload.role === 'CLUB_ADMIN') {
            return {
                role: 'CLUB_ADMIN',
                user: await this.prisma.clubAdmin.findUnique({
                    where: { admin_id: payload.sub },
                }),
            };
        }
        return {
            role: 'COACH',
            user: await this.prisma.coach.findUnique({
                where: { coach_id: payload.sub },
            }),
        };
    }
    async forgotPassword(email) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000);
        const user = (await this.prisma.superAdmin.findUnique({ where: { email } })) ||
            (await this.prisma.clubAdmin.findUnique({ where: { email } })) ||
            (await this.prisma.coach.findUnique({ where: { email } }));
        if (!user)
            return { message: 'If email exists, OTP sent' };
        let model;
        let idField;
        let idValue;
        if ('super_admin_id' in user) {
            model = this.prisma.superAdmin;
            idField = 'super_admin_id';
            idValue = user.super_admin_id;
        }
        else if ('admin_id' in user) {
            model = this.prisma.clubAdmin;
            idField = 'admin_id';
            idValue = user.admin_id;
        }
        else {
            model = this.prisma.coach;
            idField = 'coach_id';
            idValue = user.coach_id;
        }
        await model.update({
            where: { [idField]: idValue },
            data: { reset_token: otp, reset_token_expires: expires },
        });
        await this.mailService.sendResetPasswordEmail(email, otp);
        return { message: 'OTP sent to email' };
    }
    async resetPassword(token, newPassword) {
        const now = new Date();
        const user = (await this.prisma.superAdmin.findFirst({
            where: { reset_token: token, reset_token_expires: { gt: now } },
        })) ||
            (await this.prisma.clubAdmin.findFirst({
                where: { reset_token: token, reset_token_expires: { gt: now } },
            })) ||
            (await this.prisma.coach.findFirst({
                where: { reset_token: token, reset_token_expires: { gt: now } },
            }));
        if (!user)
            throw new common_1.BadRequestException('Invalid or expired OTP');
        const hashed = await bcrypt.hash(newPassword, 10);
        let model;
        let idField;
        let idValue;
        if ('super_admin_id' in user) {
            model = this.prisma.superAdmin;
            idField = 'super_admin_id';
            idValue = user.super_admin_id;
        }
        else if ('admin_id' in user) {
            model = this.prisma.clubAdmin;
            idField = 'admin_id';
            idValue = user.admin_id;
        }
        else {
            model = this.prisma.coach;
            idField = 'coach_id';
            idValue = user.coach_id;
        }
        await model.update({
            where: { [idField]: idValue },
            data: {
                password_hash: hashed,
                reset_token: null,
                reset_token_expires: null,
            },
        });
        return { message: 'Password updated successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map