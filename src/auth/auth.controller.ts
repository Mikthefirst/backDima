import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards, Get, Res, Body } from "@nestjs/common";
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const logindata = await this.authService.login(req.user);
    res.cookie("access_token", logindata.access_token, {
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });
    res.cookie("id", logindata.id, {
      secure: true,
      sameSite: "none",
    });
    res.cookie("email", logindata.email, {
      secure: true,
      sameSite: "none",
    });

    return { message: "Login successful", token: logindata.access_token };
  }

  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const newUser = await this.authService.register(createUserDto);
    const loginData = await this.authService.login(newUser);

    return {
      message: "Registration successful",
      token: loginData.access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return this.userService.findAll();
  }
}
