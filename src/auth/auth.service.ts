
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email, pass);
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException("wrong credentials");
  }

  async login(user: IUser) {
    console.log("login:", user);
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      email: user.email,
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const existingUser = await this.usersService.findOneByEmail(
        createUserDto.email
      );
      if (existingUser) {
        throw new BadRequestException("Email already in use");
      }

      const createdUser = await this.usersService.create(createUserDto);

      const userToCreate: IUser = {
        id: createdUser.id,
        fullname: createdUser.full_name,
        email: createdUser.email,
        role: createdUser.role,
      };
      return userToCreate;
    } catch (error) {
      console.log(error);
    }
  }
}
