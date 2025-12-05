"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const password_util_1 = require("../common/utils/password.util");
let SuperAdminService = class SuperAdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const password_hash = await (0, password_util_1.hashPassword)(dto.password);
        const created = await this.prisma.superAdmin.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                password_hash,
            },
        });
        delete created.password_hash;
        return created;
    }
    async findAll() {
        const list = await this.prisma.superAdmin.findMany();
        return list.map((x) => {
            const copy = { ...x };
            delete copy.password_hash;
            return copy;
        });
    }
    async findOne(id) {
        const r = await this.prisma.superAdmin.findUnique({ where: { super_admin_id: id } });
        if (!r)
            return null;
        delete r.password_hash;
        return r;
    }
    async updateProfileImage(id, filename) {
        return this.prisma.superAdmin.update({
            where: { super_admin_id: id },
            data: { profile_image: filename },
        });
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuperAdminService);
//# sourceMappingURL=super-admin.service.js.map