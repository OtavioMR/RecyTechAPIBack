import { Injectable, NotFoundException } from '@nestjs/common';
import { access } from 'fs';
import { UsuarioService } from '../Usuario/service/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { CatadorService } from 'src/catador/catador.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private catadorService: CatadorService,
    ) { }

    async loginUsuario(email: string, senha: string) {
        // 1) Buscar usuário pelo email
        const usuario = await this.usuarioService.findByEmail(email);
        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // 2) Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // 3) Gerar token JWT
        const payload = { sub: usuario.id, role: 'usuario' };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token, usuario
        };
    }

    async loginCatador(email: string, senha: string) {
        const catador = await this.catadorService.findByEmail(email);
        if (!catador) {
            throw new NotFoundException('Credenciais inválidas');
        }

        const senhaInvalida = await bcrypt.compare(senha, catador.senha);
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
