import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { BadRequestException } from '@nestjs/common';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    try {
     return this.roomService.create(createRoomDto);
   } catch (error) {
     if (error instanceof BadRequestException) {
       throw new BadRequestException("Ошибка валидации");
     }
     throw error;
   }
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }
  @Get('count')
  sendRoomNum():Promise<number> {
    const count = this.roomService.countRoom();
    return count;
  }
  
  @Get('roomWithAssets/:id')
  sendRoomWithAssets(@Param('id') id: string) {
    const roomsAndassets_json = this.roomService.findRoomWithRelatedAssets(id);
    console.log(roomsAndassets_json);
    return roomsAndassets_json;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateOwner(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
