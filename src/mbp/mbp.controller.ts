import { MbpToRoomService } from './mbp-to-room.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MbpService } from './mbp.service';
import { CreateMbpDto } from './dto/create-mbp.dto';
import { UpdateMbpDto } from './dto/update-mbp.dto';

@Controller("mbp")
export class MbpController {
  constructor(
    private readonly mbpService: MbpService,
    private readonly mbptRoom: MbpToRoomService
  ) {}

  //mbp
  @Post()
  create(@Body() createMbpDto: CreateMbpDto) {
    return this.mbpService.create(createMbpDto);
  }

  @Get()
  findAll() {
    return this.mbpService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mbpService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMbpDto: UpdateMbpDto) {
    return this.mbpService.update(id, updateMbpDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mbpService.remove(id);
  }

  //mbp-to-room
  @Post("assign-to-room")
  async addMbpToRoom(
    @Body() body: { mbpId: string; roomId: string; quantity: number }
  ) {
    return this.mbptRoom.addMbpToRoom(body.mbpId, body.roomId, body.quantity);
  }

  @Get("by-room/:roomId")
  async getMbpByRoom(@Param("roomId") roomId: string) {
    return this.mbptRoom.getMbpByRoom(roomId);
  }

  @Patch("update-quantity-room/:id")
  async updateMbpQuantity(
    @Param("id") mbpToRoomId: string,
    @Body() body: { quantity: number }
  ) {
    return this.mbptRoom.updateMbpQuantity(mbpToRoomId, body.quantity);
  }
}
