import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PodHoldersService } from './pod-holders.service';
import { CreatePodHolderDto } from './dto/create-pod-holder.dto';

@Controller('pod-holders')
export class PodHoldersController {
  constructor(private readonly service: PodHoldersService) {}

  // ✅ CREATE POD HOLDER
  @Post()
  create(@Body() dto: CreatePodHolderDto) {
    return this.service.create(dto);
  }

  // ✅ GET ALL POD HOLDERS
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ✅ GET ONE POD HOLDER
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // ✅ DELETE POD HOLDER
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
