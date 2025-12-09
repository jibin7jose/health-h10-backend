import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { ClubsModule } from './clubs/clubs.module';
import { ClubAdminModule } from './club-admin/club-admin.module';
import { CoachesModule } from './coaches/coaches.module';
import { PlayersModule } from './players/players.module';
import { PodsModule } from './pods/pods.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { EventsModule } from './events/events.module';
import { UploadsModule } from './uploads/upload.module';
import { MetricsModule } from './metrics/metrics.module';
import { PaymentsModule } from './payments/payments.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PaymentPlansModule } from './payment-plans/payment-plans.module';
import { PodHoldersModule } from './pod-holders/pod-holders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    SuperAdminModule,
    ClubsModule,
    ClubAdminModule,
    CoachesModule,
    PlayersModule,
    PaymentPlansModule,
    PodHoldersModule,
    PodsModule,
    AssignmentsModule,
    EventsModule,
    UploadsModule,
    MetricsModule,
    PaymentsModule,
    SubscriptionsModule,
    ServiceRequestsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
