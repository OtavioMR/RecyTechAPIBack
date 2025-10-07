import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { DadosUsuarioService } from '../service/dados-usuario.service';
import { CreateDadosUsuarioDto } from '../dto/create-dados-usuario.dto';
import { UpdateDadosUsuarioDto } from '../dto/update-dados-usuario';

@Controller('dados-usuario')
export class DadosUsuarioController {
  constructor(private readonly dadosService: DadosUsuarioService) {}

  @Post()
  create(@Body() createDto: CreateDadosUsuarioDto) {
    return this.dadosService.create(createDto);
  }

  @Get('todos')
  findAll() {
    return this.dadosService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.dadosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdateDadosUsuarioDto) {
    return this.dadosService.update(id, updateDto);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateDto: UpdateDadosUsuarioDto) {
    return this.dadosService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dadosService.remove(id);
  }
}
