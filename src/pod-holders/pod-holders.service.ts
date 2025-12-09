import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PodHoldersService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE POD HOLDER
  create(data: { serial_number?: string; model?: string }) {
    return this.prisma.podHolder.create({
      data,
    });
  }

  // ✅ GET ALL POD HOLDERS
  findAll() {
    return this.prisma.podHolder.findMany();
  }

  // ✅ ✅ ✅ GET ONLY UNASSIGNED POD HOLDERS
  findAvailable() {
    return this.prisma.podHolder.findMany({
      where: {
        coach_assignments: { none: {} },
        player_pod_holders: { none: {} },
      },
    });
  }

  // ✅ GET SINGLE POD HOLDER
  async findOne(id: string) {
    const pod = await this.prisma.podHolder.findUnique({
      where: { pod_holder_id: id },
    });

    if (!pod) {
      throw new NotFoundException('Pod holder not found');
    }

    return pod;
  }

  // ✅ DELETE POD HOLDER
  async remove(id: string) {
    await this.prisma.podHolder.delete({
      where: { pod_holder_id: id },
    });

    return { message: 'Pod holder deleted successfully' };
  }
}
