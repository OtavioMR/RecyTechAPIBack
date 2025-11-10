import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../Usuario/service/usuario.service';
import { CatadorService } from 'src/catador/catador.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usuarioService: UsuarioService,
    private catadorService: CatadorService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {


    // Verifica o tipo de usuário
    if (payload.role === 'usuario') {

      // payload: { sub: id, email: email }
      const usuario = await this.usuarioService.findOne(payload.sub);
      if (!usuario) {
        throw new UnauthorizedException('Catador não encontrado');
      }

      const { senha, ...result } = usuario; // não retorna a senha
      return { ...result, role: 'usuario' } // isso será injetado em req.user

    }



    // Verifica se o usuário é um catador
    if (payload.role === 'catador') {
      const catador = await this.catadorService.findOne(payload.sub);
      if (!catador) {
        throw new UnauthorizedException('Catador não encontrado');
      }

      const { senha, ...result } = catador;
      return { ...result, role: 'catador' };
    }

    throw new UnauthorizedException('Tipo de usuário inválido no token');
  }
}
