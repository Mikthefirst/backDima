import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller("assets")
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/assets",
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `asset-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
          return cb(new Error("Only image files are allowed"), false);
        }
        cb(null, true);
      },
    }),
  )
  async createAsset(
    @Body() createAssetDto: CreateAssetDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image_url = file ? `/uploads/assets/${file.filename}` : null;
    return this.assetsService.create({ ...createAssetDto, image_url });
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

  @Get(":inventory_number")
  findOne(@Param("inventory_number") inventory_number: number) {
    return this.assetsService.findOne(inventory_number);
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