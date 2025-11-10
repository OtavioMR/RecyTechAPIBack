import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DadosCatador } from './entity/dados-catador.entity';
import { Repository } from 'typeorm';
import { CreateCatadorDto } from 'src/catador/dto/create-catador.dto';
import { Catador } from 'src/catador/entity/catador.entity';
import { CreateDadosCatadorDto } from './dto/create-dadosCatadot.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class DadosCatadorService {
    constructor(
        @InjectRepository(DadosCatador)
        private dadosCatadorRepository: Repository<DadosCatador>,
        @InjectRepository(Catador)
        private catadorRepository: Repository<Catador>,
    ) {}

    async create(createDto: CreateDadosCatadorDto){
        const catador = await this.catadorRepository.findOneBy({id: createDto.catadorId});
        if(!catador){
            throw new NotFoundException('Usuário não encontrado');
        }

        const dados = this.dadosCatadorRepository.create({...createDto, catador});
        return this.dadosCatadorRepository.save(dados);
    }

    findAll(){
        return this.dadosCatadorRepository.find({relations: ['catador']});
    }
}
