import { Module } from '@nestjs/common';
import { ImageServiceService } from './image-service.service';
import { ImageServiceController } from './image-service.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Asset } from 'src/assets/entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Asset]), 
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [ImageServiceController],
  providers: [ImageServiceService],
})
export class ImageServiceModule {}


