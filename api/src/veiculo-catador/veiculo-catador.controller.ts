import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { VeiculoCatadorService } from './veiculo-catador.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVeiculoCatadorDto } from './dto/create-veiculo.dto';

@Controller('veiculo-catador')
export class VeiculoCatadorController {
    constructor(private readonly veiculoService: VeiculoCatadorService) {}

    @UseGuards(JwtAuthGuard)
    @Post('cadastrar-veiculo')
    cadastroVeiculo(@Body() dto: CreateVeiculoCatadorDto, @Request() req){
        return this.veiculoService.cadastroVeiculo(dto, req.user.id, req.user.role);
    }
}
