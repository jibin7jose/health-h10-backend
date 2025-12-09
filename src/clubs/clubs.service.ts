import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async create(super_admin_id: string, dto: any) {
    const club = await this.prisma.club.create({
      data: {
        super_admin_id,
        club_name: dto.club_name,
        address: dto.address,
        sport: dto.sport,
      },
    });

    const password_hash = await bcrypt.hash(dto.admin_password, 10);

    await this.prisma.clubAdmin.create({
      data: {
        club_id: club.club_id,
        name: dto.admin_name,
        email: dto.admin_email,
        password_hash,
      },
    });

    return {
      message: 'Club & Admin created successfully',
      club,
    };
  }

  findAll() {
    return this.prisma.club.findMany({
      include: { club_admins: true },
    });
  }

  findOne(id: string) {
    return this.prisma.club.findUnique({
      where: { club_id: id },
      include: { club_admins: true },
    });
  }
}
