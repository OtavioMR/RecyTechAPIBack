import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VeiculoCatador } from './entity/veiculo.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/Usuario/entity/usuario.entity';
import { CreateVeiculoCatadorDto } from './dto/create-veiculo.dto';
import { Catador } from 'src/catador/entity/catador.entity';

@Injectable()
export class VeiculoCatadorService {
    constructor(
        @InjectRepository(VeiculoCatador)
        private veiculoRepository: Repository<VeiculoCatador>,
        @InjectRepository(Catador)
        private catadorRepository: Repository<Catador>,
    ){}

    async cadastroVeiculo(dto: CreateVeiculoCatadorDto, catadorId:number, role: string){

        if(role !== 'catador') throw new UnauthorizedException('Somente catadores podem cadastrar veiculos');

        const catador = await this.catadorRepository.findOne({ where: { id: catadorId}});
        if(!catador) throw new NotFoundException('Catador não encontrado');

        const novoVeiculo = this.veiculoRepository.create({
            placa: dto.placa,
            modelo: dto.modelo,
            porte: dto.porte,
            catador: catador,
        });

        return await this.veiculoRepository.save(novoVeiculo);
    }
}