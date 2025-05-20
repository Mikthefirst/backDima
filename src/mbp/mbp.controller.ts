import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MbpService } from './mbp.service';
import { CreateMbpDto } from './dto/create-mbp.dto';
import { UpdateMbpDto } from './dto/update-mbp.dto';

@Controller('mbp')
export class MbpController {
  constructor(private readonly mbpService: MbpService) {}

  @Post()
  create(@Body() createMbpDto: CreateMbpDto) {
    return this.mbpService.create(createMbpDto);
  }

  @Get()
  findAll() {
    return this.mbpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mbpService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMbpDto: UpdateMbpDto) {
    return this.mbpService.update(id, updateMbpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mbpService.remove(id);
  }
}
