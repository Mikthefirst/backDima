import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';
import { Asset } from 'src/assets/entities/asset.entity';
import { Report } from './entities/report.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Room, Asset, Report])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
