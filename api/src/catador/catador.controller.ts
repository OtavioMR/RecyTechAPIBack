import { Body, Controller, Post, Get, Param} from '@nestjs/common';
import { CatadorService } from './catador.service';
import { CreateCatadorDto } from './dto/create-catador.dto';

@Controller('catador')
export class CatadorController {
    constructor(private readonly catadorService: CatadorService) {}

    @Post('cadastro')
    create(@Body() dto: CreateCatadorDto) {
        return this.catadorService.create(dto);
    }

    @Get('listar-catadores')
    findAll(){
        return this.catadorService.findAll();
    }

    @Get('listar-catador/:id')
    findOne(@Param('id') id:number){
        return this.catadorService.findOne(id);
    }
}
