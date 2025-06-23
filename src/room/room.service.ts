import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from './entities/room.entity';
import { Asset } from 'src/assets/entities/asset.entity';
import { OnModuleInit } from "@nestjs/common";


@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>
  ) {}

  async onModuleInit() {
    await this.initRoomsIfEmpty();
  }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      console.log("Post req RoomDto: ", createRoomDto);
      const user = this.roomRepository.create(createRoomDto);
      return await this.roomRepository.save(user);
    } catch (error) {
      console.error("Error creating room: ", error);
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async findAll(): Promise<Room[]> {
    console.log("Get all rooms:");
    return await this.roomRepository.find();
  }

  async findRoomWithRelatedAssets(id: string) {
    const room: Room = await this.roomRepository.findOne({ where: { id } });

    if (!room) {
      throw new NotFoundException("Room not found");
    }

    const assets = await this.assetsRepository.find({
      where: { room: { id: room.id } },
      relations: ["room"],
    });

    return assets;
  }

  async updateOwner(id: string, updateRoomDto: UpdateRoomDto) {
    let room: Room = await this.roomRepository.findOne({ where: { id } });
    Object.assign(room, updateRoomDto);
    return await this.roomRepository.save(room);
  }

  remove(id: string) {
    return this.roomRepository.delete(id);
  }

  private async initRoomsIfEmpty() {
    const count = await this.roomRepository.count();

    if (count > 0) {
      console.log("Rooms already exist, skipping initialization.");
      return;
    }

    const rooms: CreateRoomDto[] = [
      {
        name: "Каб 101",
        width: 5,
        height: 4,
        x: 0,
        y: 0,
        owner_id: "11111111-1111-1111-1111-111111111111",
      },
      { name: "Каб 102", width: 6, height: 4, x: 5, y: 0 },
      {
        name: "Каб 103",
        width: 4,
        height: 4,
        x: 11,
        y: 0,
        owner_id: "22222222-2222-2222-2222-222222222222",
      },
      { name: "Каб 104", width: 5, height: 5, x: 0, y: 5 },
      {
        name: "Каб 105",
        width: 6,
        height: 5,
        x: 6,
        y: 5,
        owner_id: "33333333-3333-3333-3333-333333333333",
      },
      { name: "Каб 201", width: 7, height: 4, x: 0, y: 0 },
      {
        name: "Каб 202",
        width: 5,
        height: 5,
        x: 7,
        y: 0,
        owner_id: "44444444-4444-4444-4444-444444444444",
      },
      { name: "Каб 203", width: 6, height: 4, x: 0, y: 5 },
      {
        name: "Каб 204",
        width: 4,
        height: 4,
        x: 6,
        y: 5,
        owner_id: "55555555-5555-5555-5555-555555555555",
      },
    ];

    try {
      await this.roomRepository.save(rooms);
      console.log("Initial rooms successfully created.");
    } catch (error) {
      console.error("Failed to initialize rooms:", error);
    }
  }

  async countRoom(): Promise<number> {
    return await this.roomRepository.count();
  }
}
