import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller("assets")
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create({ ...createAssetDto });
  }


  @Get()
  findAll() {
    console.log("req all assets: ");
    return this.assetsService.getAssetsWithRooms();
  }

  @Get("/count")
  count() {
    return this.assetsService.getNumberOfAssets();
  }


  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(id, updateAssetDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.assetsService.remove(id);
  }
}