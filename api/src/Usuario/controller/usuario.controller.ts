import { Controller, Get, Post, Body, Param, Put, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @ApiOperation({
    summary: 'Cria um novo usuário',
    description: 'Cadastra um novo usuário no sistema com nome, email e senha.'
  })
  @ApiBody({
    description: 'Dados necessários para criar o usuário',
    schema: {
      example: {
        nomeCompleto: 'Teste da Silva',
        nomeUsuario: 'Teste123',
        senha: 'senha123',
        email: 'teste@gmail.com'
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @Post('create')
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Lista todos os usuários',
    description: 'Retorna uma lista completa dos usuários cadastrados.'
  })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  @Get('todos')
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Retorna o usuário logado',
    description: 'Busca o usuário baseado no token JWT atual.'
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @Get('usuario-logado')
  findOne(@Request() req) {
    return this.usuarioService.findOne(req.user.id);
  }

  @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retorna dados do usuário autenticado' })
  @Get('me')
  async me(@Request() req: any) {
    return this.usuarioService.findOne(req.user.id);
  }
}

