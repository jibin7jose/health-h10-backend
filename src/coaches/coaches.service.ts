import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CoachesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { coach_name: string; email: string; password: string; phone?: string; club_id: string }) {
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

  findAll() {
    return this.prisma.coach.findMany();
  }

  async assignPodHolder(coach_id: string, pod_holder_id: string) {
    return this.prisma.coachAssignment.create({
      data: {
        coach_id,
        pod_holder_id,
      },
    });
  }
}
