import { Module } from '@nestjs/common';
import { MbpService } from './mbp.service';
import { MbpController } from './mbp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mbp } from './entities/mbp.entity';
import { MbpToRoomService } from './mbp-to-room.service';
import { MbpToRoom } from './entities/mbp-to-room.entity';
import { Room } from 'src/room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mbp, MbpToRoom, Room])],
  controllers: [MbpController],
  providers: [MbpService, MbpToRoomService],
  exports: [MbpService],
})
export class MbpModule {}
