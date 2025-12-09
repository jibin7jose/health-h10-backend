import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('coaches')
export class CoachesController {
  constructor(private svc: CoachesService) {}

  // ✅ ✅ ✅ ONLY CLUB ADMIN CAN CREATE COACH
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLUB_ADMIN')
  @Post()
  async create(@Req() req: any, @Body() dto: CreateCoachDto) {
    const club_id = req.user?.club_id;

    // ✅ ✅ ✅ SAFETY CHECK — PREVENTS 500 INTERNAL SERVER ERROR
    if (!club_id) {
      throw new BadRequestException(
        'club_id missing in token. Please logout and login again.',
      );
    }

    return this.svc.create({
      ...dto,
      club_id,
    });
  }

  // ✅ OPTIONAL: GET ALL COACHES
  @Get()
  findAll() {
    return this.svc.findAll();
  }

  // ✅ ✅ ✅ ASSIGN POD HOLDER TO COACH
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLUB_ADMIN')
  @Post('assign-pod-holder')
  async assign(
    @Body()
    body: {
      coach_id: string;
      pod_holder_id: string;
    },
  ) {
    if (!body.coach_id || !body.pod_holder_id) {
      throw new BadRequestException(
        'coach_id and pod_holder_id are required',
      );
    }

    return this.svc.assignPodHolder(
      body.coach_id,
      body.pod_holder_id,
    );
  }
}
