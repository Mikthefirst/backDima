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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      password: "246753981",
      username: "postgres",
      entities: [User, Room, Asset],
      database: "dima-diplom",
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
      envFilePath: ".env", // explicitly specify the path
    }),
    UserModule,
    RoomModule,
    AssetsModule,
    AuthModule,
    ImageServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
