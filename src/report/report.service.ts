import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from 'src/assets/entities/asset.entity';
import { Mbp } from 'src/mbp/entities/mbp.entity';
import { User } from 'src/user/entities/user.entity';
import { CloseReportDto } from './dto/close-report.dto';
import { ReportStatus } from './enums/status.enum';
import { Urgency } from './enums/urgency.enum';
import { ReportInterface } from './interface/report.interface';
import { Room } from 'src/room/entities/room.entity';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    @InjectRepository(Mbp)
    private readonly mbpRepo: Repository<Mbp>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>
  ) {}

  async create(createReportDto: CreateReportDto) {
    const {
      reason,
      description,
      assetId,
      mbpId,
      roomId,
      urgency = Urgency.LOW,
      status = ReportStatus.PENDING,
      createdById,
    } = createReportDto;

    const reportData: ReportInterface = {
      reason,
      description,
      urgency,
      status,
      createdBy: await this.userRepo.findOneByOrFail({ id: createdById }),
    };

    if (assetId || mbpId) {
      if (assetId) {
        reportData.asset = await this.assetRepo.findOneByOrFail({
          id: assetId,
        });
      }

      if (mbpId) {
        reportData.mbp = await this.mbpRepo.findOneByOrFail({ id: mbpId });
      }
    }
   else throw new BadRequestException("need to specify mbp or Asset")

    if (roomId) {
      reportData.room = await this.roomRepo.findOneByOrFail({ id: roomId });
    }

    const res = this.reportRepo.create(reportData as any);
    return this.reportRepo.save(res);
  }

  async closeReport(id: string, closeDto: CloseReportDto): Promise<Report> {
    try {
      const report: Report = await this.reportRepo.findOneByOrFail({ id });
      report.status = closeDto.status;
      if (closeDto.comment) report.comment = closeDto.comment;
      return this.reportRepo.save(report);
    } catch (error) {
      console.log(error);
    }
   
  }

  async getAll(): Promise<Report[]> {
    return this.reportRepo.find({
      relations: ["asset", "room", "createdBy"],
    });
  }
}
