import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Asset } from './entities/asset.entity';
import { Room } from 'src/room/entities/room.entity';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
  imports: [TypeOrmModule.forFeature([Asset, Room])],
})
export class AssetsModule {}
