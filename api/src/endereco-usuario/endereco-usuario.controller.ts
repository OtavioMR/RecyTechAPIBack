import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { EnderecoUsuarioService } from './endereco-usuario.service';
import { CreateEnderecoUsuarioDto } from './dto/create-endereco-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('endereco-usuario')
export class EnderecoUsuarioController {
    constructor(private readonly enderecoService: EnderecoUsuarioService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createDto: CreateEnderecoUsuarioDto, @Request() req) {
        return this.enderecoService.create(createDto, req.user.id);
    }

    @Get('todos')
    findAll() {
        return this.enderecoService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('meus-enderecos')
    findOne(@Request() req) {
        const usuarioId = req.user.id; // Obtém o ID do usuário autenticado
        return this.enderecoService.findByUsuarioId(usuarioId);
    }
}
