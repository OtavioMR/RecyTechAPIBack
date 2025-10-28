import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../Usuario/service/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usuarioService: UsuarioService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // payload: { sub: id, email: email }
    const usuario = await this.usuarioService.findOne(payload.sub);
    if (!usuario) return null;

    const { senha, ...result } = usuario; // não retorna a senha
    return result; // isso será injetado em req.user
  }
}
