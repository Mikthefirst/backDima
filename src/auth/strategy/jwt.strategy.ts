import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { IUser } from 'src/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest:  ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.access_token || 
                 request?.headers?.authorization?.split(' ')[1];
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(user: IUser) {
    return { id: user.id, email: user.email, role: user.role};
  }
}
