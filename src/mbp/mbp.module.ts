import { Module } from '@nestjs/common';
import { MbpService } from './mbp.service';
import { MbpController } from './mbp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mbp } from './entities/mbp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mbp])],
  controllers: [MbpController],
  providers: [MbpService],
  exports: [MbpService]
})
export class MbpModule {}
