import { Report } from './report/entities/report.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Room } from './room/entities/room.entity';
import { RoomModule } from './room/room.module';
import { AssetsModule } from './assets/assets.module';
import { Asset } from './assets/entities/asset.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ImageServiceModule } from './image-service/image-service.module';
import { MbpModule } from './mbp/mbp.module';
import { Mbp } from './mbp/entities/mbp.entity';
import { MbpToRoom } from './mbp/entities/mbp-to-room.entity';
import { ReportModule } from './report/report.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASS,
      username: process.env.DB_USERNAME,
      entities: [User, Room, Asset, Mbp, MbpToRoom, Report],
      database: process.env.DB_DATABASE,
      synchronize: true,
     
    }),
    UserModule,
    RoomModule,
    AssetsModule,
    AuthModule,
    ImageServiceModule,
    MbpModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


/*
Нужно добавлять это для deploy на render в TypeOrmModule.forRoot({

  ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
 */