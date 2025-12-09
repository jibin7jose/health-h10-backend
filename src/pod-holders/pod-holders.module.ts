import { Module } from '@nestjs/common';
import { PodHoldersService } from './pod-holders.service';
import { PodHoldersController } from './pod-holders.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PodHoldersController],
  providers: [PodHoldersService],
})
export class PodHoldersModule {}
