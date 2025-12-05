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
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MetricsService = class MetricsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.activityMetric.create({
            data: {
                player_id: dto.player_id,
                total_distance: dto.total_distance,
                hsr_distance: dto.hsr_distance,
                sprint_distance: dto.sprint_distance,
                top_speed: dto.top_speed,
                sprint_count: dto.sprint_count,
                acceleration: dto.acceleration,
                deceleration: dto.deceleration,
                max_acceleration: dto.max_acceleration,
                max_deceleration: dto.max_deceleration,
                player_load: dto.player_load,
                power_score: dto.power_score,
                hr_max: dto.hr_max,
                time_in_red_zone: dto.time_in_red_zone,
                percent_in_red_zone: dto.percent_in_red_zone,
                hr_recovery_time: dto.hr_recovery_time,
                recorded_at: dto.recorded_at ? new Date(dto.recorded_at) : undefined,
            },
        });
    }
    async findByPlayer(player_id) {
        return this.prisma.activityMetric.findMany({
            where: { player_id },
            orderBy: { recorded_at: 'desc' },
        });
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map