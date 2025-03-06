import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { BadRequestException } from '@nestjs/common';

@Controller('room')
export class RoomController {
  constructor(private readonly userService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    try {
     return this.userService.create(createRoomDto);
   } catch (error) {
     if (error instanceof BadRequestException) {
       throw new BadRequestException("Ошибка валидации");
     }
     throw error;
   }
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Room> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.userService.updateOwner(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
