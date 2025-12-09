import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';

import { ClubAdminService } from './club-admin.service';
import { CreateClubAdminDto } from './dto/create-club-admin.dto';

// ✅ AUTH IMPORTS
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('club-admin')
export class ClubAdminController {
  constructor(private readonly svc: ClubAdminService) {}

  // ✅ ONLY SUPER ADMIN CAN CREATE CLUB ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() dto: CreateClubAdminDto) {
    return this.svc.create(dto);
  }

  // ✅ PUBLIC: GET ALL CLUB ADMINS
  @Get()
  findAll() {
    return this.svc.findAll();
  }
}
