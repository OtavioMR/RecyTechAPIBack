import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { UsuarioService } from '../Usuario/service/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, senha: string) {
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
        const payload = { sub: usuario.id, email: usuario.email };
        const token = this.jwtService.sign(payload);

        // 4) Retornar token e dados do usuário 
        return {
            access_token: token,
        }
    }
}
