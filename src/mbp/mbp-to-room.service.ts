import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Mbp } from "./entities/mbp.entity";
import { MbpToRoom } from "./entities/mbp-to-room.entity";
import { Room } from "src/room/entities/room.entity";

@Injectable()
export class MbpToRoomService {
  constructor(
    @InjectRepository(Mbp)
    private readonly mbpRepo: Repository<Mbp>,
    @InjectRepository(MbpToRoom)
    private readonly mbpToRoomRepo: Repository<MbpToRoom>,
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>
  ) {}

  async addMbpToRoom(
    mbpId: string,
    roomId: string,
    quantity: number
  ): Promise<MbpToRoom> {
    const mbp = await this.mbpRepo.findOne({ where: { id: mbpId } });
    const room = await this.roomRepo.findOne({ where: { id: roomId } });

    if (!mbp || !room) {
      throw new NotFoundException("Mbp or Room not found");
    }

    const mbpToRoom = this.mbpToRoomRepo.create({ mbp, room, quantity });
    return this.mbpToRoomRepo.save(mbpToRoom);
  }

  async getMbpByRoom(roomId: string): Promise<MbpToRoom[]> {
    return this.mbpToRoomRepo.find({
      where: { room: { id: roomId } },
      relations: ["mbp", "room"],
    });
  }

  async updateMbpQuantity(
    mbpToRoomId: string,
    quantity: number
  ): Promise<MbpToRoom> {
    const record = await this.mbpToRoomRepo.findOne({
      where: { id: mbpToRoomId },
    });
    if (!record) {
      throw new NotFoundException("MbpToRoom record not found");
    }

    record.quantity = quantity;
    return this.mbpToRoomRepo.save(record);
  }

}
