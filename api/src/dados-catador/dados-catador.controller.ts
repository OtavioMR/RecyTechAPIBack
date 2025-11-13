import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { DadosCatadorService } from './dados-catador.service';
import { CreateDadosCatadorDto } from './dto/create-dadosCatadot.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateDadosCatadorDto } from './dto/update-dadosCatador.dto';

@Controller('dados-catador')
export class DadosCatadorController {
    constructor(private readonly dadosService: DadosCatadorService) { }

    @UseGuards(JwtAuthGuard)
    @Patch('cadastro')
    atualizarDados(@Body() dto: UpdateDadosCatadorDto, @Request() req){
        return this.dadosService.atualizarDados(dto, req.user.id);
    }

    @Get()
    findAll(){
        return this.dadosService.findAll();
    }

}
