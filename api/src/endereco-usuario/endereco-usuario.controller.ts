import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { EnderecoUsuarioService } from './endereco-usuario.service';
import { CreateEnderecoUsuarioDto } from './dto/create-endereco-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('endereco-usuario')
export class EnderecoUsuarioController {
    constructor(private readonly enderecoService: EnderecoUsuarioService) { }

    @Post()
    create(@Body() createDto: CreateEnderecoUsuarioDto) {
        return this.enderecoService.create(createDto);
    }

    @Get('todos')
    findAll() {
        return this.enderecoService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('meus-enderecos')
    findOne(@Req() req) {
        const usuarioId = req.user.id; // Obtém o ID do usuário autenticado
        return this.enderecoService.findByUsuarioId(usuarioId);
    }
}
