import { Controller, Get, Post, Body, Param, Put, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { DadosUsuarioService } from '../service/dados-usuario.service';
import { CreateDadosUsuarioDto } from '../dto/create-dados-usuario.dto';
import { UpdateDadosUsuarioDto } from '../dto/update-dados-usuario';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BADFAMILY } from 'dns';

@Controller('dados-usuario')
export class DadosUsuarioController {
  constructor(private readonly dadosService: DadosUsuarioService) {}

  @Get('todos')
  findAll() {
    return this.dadosService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.dadosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/att')
  patch(@Body() dto: CreateDadosUsuarioDto, @Request() req) {
    return this.dadosService.updateDados(dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dadosService.remove(id);
  }
}
