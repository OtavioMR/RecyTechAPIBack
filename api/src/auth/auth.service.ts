import { Injectable, NotFoundException } from '@nestjs/common';
import { access } from 'fs';
import { UsuarioService } from '../Usuario/service/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { CatadorService } from 'src/catador/catador.service';
import { NotFoundError } from 'rxjs';
import { DadosUsuario } from 'src/Dados-Usuario/entity/dados-usuario.entity';
import { DadosCatador } from 'src/dados-catador/entity/dados-catador.entity';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private catadorService: CatadorService,
    ) { }

    async loginUsuario(email: string, senha: string) {
        const dadosUsuario = await this.usuarioService.findByEmail(email);

        if (!dadosUsuario || !dadosUsuario.usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const senhaValida = await bcrypt.compare(senha, dadosUsuario.usuario.senha);
        if (!senhaValida) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: dadosUsuario.usuario.id, role: 'usuario' };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            usuario: dadosUsuario.usuario,
        };
    }


    async loginCatador(email: string, senha: string) {
        const catador = await this.catadorService.findByEmail(email);

        if(!catador || !catador.catador) throw new UnauthorizedException('Credenciais inválidas');
       
        const senhaInvalida = await bcrypt.compare(senha, catador.catador.senha);
        if (!senhaInvalida) {
            throw new NotFoundException('Credenciais inválidas');
        }

        const payload = { sub: catador.id, role: 'catador' };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token, catador
        };

    }
}