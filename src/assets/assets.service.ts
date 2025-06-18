import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Room } from 'src/room/entities/room.entity';


@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {}

  async create(data: CreateAssetDto) {
    try {
      const room = await this.roomRepository.findOne({
        where: { id: data.room_id },
      });
      if (!room)
        throw new NotFoundException(`Room with id ${data.room_id} not found`);

      const asset = this.assetRepository.create({ ...data, room });
      return await this.assetRepository.save(asset);
    } catch (error) {
      console.error("Error creating asset:", error);
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async getAssetsWithRooms() {
    const assets = await this.assetRepository.find({ relations: ["room"] });
    return assets;
  }

  async getNumberOfAssets() {
    const [asset, assetsCount] = await this.assetRepository.findAndCount();
    return assetsCount;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    const asset = await this.assetRepository.findOne({ where: { id } });
    if (!asset) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }

    // Обновим room, если указан
    if (updateAssetDto.room_id) {
      const room = await this.roomRepository.findOne({
        where: { id: updateAssetDto.room_id },
      });
      if (!room) {
        throw new NotFoundException(
          `Room with id ${updateAssetDto.room_id} not found`
        );
      }
      asset.room = room;
    }

    // Удаляем room_id из dto, чтобы избежать ошибки
    const { room_id, ...rest } = updateAssetDto;

    Object.assign(asset, rest);

    return await this.assetRepository.save(asset);
  }

  async remove(id: string) {
    // <-- id теперь string
    const asset = await this.assetRepository.findOne({ where: { id } });
    await this.assetRepository.remove(asset);
    return { message: `Asset with id ${id} deleted successfully` };
  }
}
