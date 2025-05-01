import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from './entities/room.entity';
import { Asset } from 'src/assets/entities/asset.entity';


@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Asset) private readonly assetsRepository: Repository<Asset>
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
         console.log("Post req RoomDto: ", createRoomDto);
         const user = this.roomRepository.create(createRoomDto);
         return await this.roomRepository.save(user);
    } catch (error) {
        console.error('Error creating room: ', error);
        throw new InternalServerErrorException('Something went wrong');
      }
  }
 

  async findAll(): Promise<Room[]> {
    console.log('Get all rooms:');
    return await this.roomRepository.find();
  }

  async findRoomWithRelatedAssets(id: string){
    const room:Room = await this.roomRepository.findOne({ where: { id } });
  
    if (!room) {
      throw new NotFoundException("Room not found");
    }

    const assets = await this.assetsRepository.find({
      where: { room_id: room.id },
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
}
