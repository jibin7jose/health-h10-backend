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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachesController = void 0;
const common_1 = require("@nestjs/common");
const coaches_service_1 = require("./coaches.service");
const create_coach_dto_1 = require("./dto/create-coach.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CoachesController = class CoachesController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async create(req, dto) {
        const club_id = req.user?.club_id;
        if (!club_id) {
            throw new common_1.BadRequestException('club_id missing in token. Please logout and login again.');
        }
        return this.svc.create({
            ...dto,
            club_id,
        });
    }
    async getMyClubCoaches(req) {
        const club_id = req.user?.club_id;
        if (!club_id) {
            throw new common_1.BadRequestException('club_id missing in token');
        }
        return this.svc.findByClub(club_id);
    }
    async assign(body) {
        if (!body.coach_id || !body.pod_holder_id) {
            throw new common_1.BadRequestException('coach_id and pod_holder_id are required');
        }
        return this.svc.assignPodHolder(body.coach_id, body.pod_holder_id);
    }
};
exports.CoachesController = CoachesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('CLUB_ADMIN'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_coach_dto_1.CreateCoachDto]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('CLUB_ADMIN'),
    (0, common_1.Get)('my-club'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "getMyClubCoaches", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('CLUB_ADMIN'),
    (0, common_1.Post)('assign-pod-holder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "assign", null);
exports.CoachesController = CoachesController = __decorate([
    (0, common_1.Controller)('coaches'),
    __metadata("design:paramtypes", [coaches_service_1.CoachesService])
], CoachesController);
//# sourceMappingURL=coaches.controller.js.map