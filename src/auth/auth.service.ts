
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email, pass)
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
      throw new BadRequestException("wrong credentials");
  }
}
