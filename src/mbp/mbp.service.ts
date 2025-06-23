import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Mbp } from "./entities/mbp.entity";
import { CreateMbpDto } from "./dto/create-mbp.dto";
import { UpdateMbpDto } from "./dto/update-mbp.dto";

@Injectable()
export class MbpService {
  constructor(
    @InjectRepository(Mbp)
    private readonly mbpRepository: Repository<Mbp>
  ) {}

  async create(createMbpDto: CreateMbpDto): Promise<Mbp> {
    const newMbp = this.mbpRepository.create(createMbpDto);
    return await this.mbpRepository.save(newMbp);
  }

  async findAll(): Promise<Mbp[]> {
    return await this.mbpRepository.find();
  }

  async findOne(id: string): Promise<Mbp> {
    const mbp = await this.mbpRepository.findOne({ where: { id } });
    if (!mbp) {
      throw new NotFoundException(`Mbp with id ${id} not found`);
    }
    return mbp;
  }

  async update(id: string, updateMbpDto: UpdateMbpDto): Promise<Mbp> {
    const mbp = await this.findOne(id);
    const updated = Object.assign(mbp, updateMbpDto);
    return await this.mbpRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const mbp = await this.findOne(id);
    await this.mbpRepository.remove(mbp);
  }

  async count(): Promise<number> {
    return await this.mbpRepository
      .createQueryBuilder("mbp")
      .where("mbp.overallQuantity < mbp.minQuantity")
      .getCount();
  }
}
