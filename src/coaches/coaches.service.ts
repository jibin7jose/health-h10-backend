import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CoachesService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE COACH
  async create(dto: {
    coach_name: string;
    email: string;
    password: string;
    phone?: string;
    club_id: string;
  }) {
    const password_hash = await bcrypt.hash(dto.password, 10);

    return this.prisma.coach.create({
      data: {
        coach_name: dto.coach_name,
        email: dto.email,
        phone: dto.phone || null,
        club_id: dto.club_id,
        password_hash,
        role: 'COACH',
      },
    });
  }

  // ✅ ✅ ✅ GET ONLY COACHES BELONGING TO LOGGED-IN CLUB
  async findByClub(club_id: string) {
    return this.prisma.coach.findMany({
      where: {
        club_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // ✅ ✅ ✅ SAFE POD HOLDER ASSIGNMENT (NO DUPLICATES)
  async assignPodHolder(coach_id: string, pod_holder_id: string) {
    const coachUse = await this.prisma.coachAssignment.findFirst({
      where: { pod_holder_id },
    });

    const playerUse = await this.prisma.playerPodHolder.findFirst({
      where: { pod_holder_id },
    });

    if (coachUse || playerUse) {
      throw new BadRequestException(
        'This pod holder is already assigned and cannot be reused',
      );
    }

    return this.prisma.coachAssignment.create({
      data: {
        coach_id,
        pod_holder_id,
      },
    });
  }
}
