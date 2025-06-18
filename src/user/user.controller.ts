import { Role } from './enums/role.enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  Put,
  Req,
  ForbiddenException,
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from "src/auth/guards/role.guard";
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePasswordDto } from './dto/change-pass.dto';


@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException("Ошибка валидации");
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query("role") role?: Role): Promise<Omit<User, "password">[]> {
    return this.userService.findAll(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get("non-admins")
  findNonAdminUsers(): Promise<Omit<User, "password">[]> {
    console.log('non-admin');
    return this.userService.findAllNonAdmins();
  }
  @Get(":id")
  findOne(@Param("id") id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("change-password/:id")
  async changePassword(
    @Param("id") id: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any
  ) {
    console.log("pass change req was", req.user);
    const user = req.user;

    return this.userService.changePassword(
      id,
      req.user.email,
      changePasswordDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
