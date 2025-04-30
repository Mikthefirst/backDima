import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from "@nestjs/common";
import { ImageServiceService } from './image-service.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { multerConfig } from './file-upload.config';
import { IUser } from "src/types/types";


@Controller("image-service")
export class ImageServiceController {
  constructor(private readonly imageServiceService: ImageServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post("upload-avatar")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const user: IUser = req.user;
    return this.imageServiceService.handleFileUpload(file, user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get("get-avatar")
  async getAvatar(@Request() req, @Res() res) {

    return this.imageServiceService.sendAvatar(req, res);
  }
}
