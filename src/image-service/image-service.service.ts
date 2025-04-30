import {
  BadRequestException, ForbiddenException,NotFoundException,
  Injectable} from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUser } from "src/types/types";
import * as path from "path";


@Injectable()
export class ImageServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}


  async handleFileUpload(file: Express.Multer.File, email) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    let user: User = await this.userRepository.findOne({ where: { email } });
    if (!user) { throw new ForbiddenException("User not found"); }
    else {
      await this.userRepository.update(
        { email },
        { avatar: file.filename } // Store just the filename or full path if needed
      );
    }

    return {
      message: "File uploaded successfully",
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async sendAvatar(req, res) {
    const userReq: IUser = req.user;
    const user: User = await this.userRepository.findOne({
      where: { email: userReq.email },
    });
    if (!user.avatar) {
      throw new NotFoundException("couldnt find avatar");
    }
    const filePath = path.join(
      process.cwd(),
      "uploads/profileImage",
      user.avatar
    );

    console.log(filePath);
    res.sendFile(filePath);
  }
}
