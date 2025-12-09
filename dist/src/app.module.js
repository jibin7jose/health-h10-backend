"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const super_admin_module_1 = require("./super-admin/super-admin.module");
const clubs_module_1 = require("./clubs/clubs.module");
const club_admin_module_1 = require("./club-admin/club-admin.module");
const coaches_module_1 = require("./coaches/coaches.module");
const players_module_1 = require("./players/players.module");
const pods_module_1 = require("./pods/pods.module");
const assignments_module_1 = require("./assignments/assignments.module");
const events_module_1 = require("./events/events.module");
const upload_module_1 = require("./uploads/upload.module");
const metrics_module_1 = require("./metrics/metrics.module");
const payments_module_1 = require("./payments/payments.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const service_requests_module_1 = require("./service-requests/service-requests.module");
const analytics_module_1 = require("./analytics/analytics.module");
const payment_plans_module_1 = require("./payment-plans/payment-plans.module");
const pod_holders_module_1 = require("./pod-holders/pod-holders.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            super_admin_module_1.SuperAdminModule,
            clubs_module_1.ClubsModule,
            club_admin_module_1.ClubAdminModule,
            coaches_module_1.CoachesModule,
            players_module_1.PlayersModule,
            payment_plans_module_1.PaymentPlansModule,
            pod_holders_module_1.PodHoldersModule,
            pods_module_1.PodsModule,
            assignments_module_1.AssignmentsModule,
            events_module_1.EventsModule,
            upload_module_1.UploadsModule,
            metrics_module_1.MetricsModule,
            payments_module_1.PaymentsModule,
            subscriptions_module_1.SubscriptionsModule,
            service_requests_module_1.ServiceRequestsModule,
            analytics_module_1.AnalyticsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map