
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
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
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      email: user.email,
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
