import { Controller, Get, Post, Body, Param, Put, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('create')
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('todos')
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

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
  @Get('me')
  async me(@Request() req: any) {
    const usuarioId = req.user.id;
    return this.usuarioService.findOne(usuarioId);
  }


}
