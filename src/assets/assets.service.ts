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


@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>
  ) {}

  async create(data: any) {
    try {
      const asset = this.assetRepository.create(data);
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

  async findOne(inventory_number: number) {
    const asset = await this.assetRepository.findOne({
      where: { inventory_number },
    });
    if (!asset) {
      throw new NotFoundException(
        `Asset with id ${inventory_number} not found`
      );
    }
    return asset;
  }

  async getNumberOfAssets() {
    const [asset, assetsCount] = await this.assetRepository.findAndCount();
    return assetsCount;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    // <-- id теперь string
    await this.assetRepository.update(id, updateAssetDto);
    return this.assetRepository.findOne({ where: { id } }); // <-- Теперь id передается корректно
  }

  async remove(id: string) {
    // <-- id теперь string
    const asset = await this.assetRepository.findOne({ where: { id } });
    await this.assetRepository.remove(asset);
    return { message: `Asset with id ${id} deleted successfully` };
  }
}
