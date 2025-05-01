import { Module } from '@nestjs/common';
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Asset } from 'src/assets/entities/asset.entity';



@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [TypeOrmModule.forFeature([Room]),
  TypeOrmModule.forFeature([Asset]),]
})
export class RoomModule {}
