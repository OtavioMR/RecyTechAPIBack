import { Body, Controller, Get, Post } from '@nestjs/common';
import { DadosCatadorService } from './dados-catador.service';
import { CreateDadosCatadorDto } from './dto/create-dadosCatadot.dto';

@Controller('dados-catador')
export class DadosCatadorController {
    constructor(private readonly dadosService: DadosCatadorService) { }

    @Post('cadastro')
    creatre(@Body() dto: CreateDadosCatadorDto){
        return this.dadosService.create(dto);
    }

    @Get()
    findAll(){
        return this.dadosService.findAll();
    }

}
