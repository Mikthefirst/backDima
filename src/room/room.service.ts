import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from './entities/room.entity';
import {InternalServerErrorException} from '@nestjs/common';


@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
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

  findOne(id: string) :Promise<Room> {
  return this.roomRepository.findOne({ where: { id } });
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
