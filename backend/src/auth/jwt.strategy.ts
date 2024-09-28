import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // El token será inválido si ha expirado
      secretOrKey: configService.get<string>("JWT_SECRET"), // La clave secreta
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
