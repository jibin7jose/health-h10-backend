import { Injectable } from '@nestjs/common';
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

  // ✅ GET SINGLE POD HOLDER
  findOne(id: string) {
    return this.prisma.podHolder.findUnique({
      where: { pod_holder_id: id },
    });
  }

  // ✅ DELETE POD HOLDER
  remove(id: string) {
    return this.prisma.podHolder.delete({
      where: { pod_holder_id: id },
    });
  }
}
