import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DadosCatador } from './entity/dados-catador.entity';
import { Repository } from 'typeorm';
import { CreateCatadorDto } from 'src/catador/dto/create-catador.dto';
import { Catador } from 'src/catador/entity/catador.entity';
import { CreateDadosCatadorDto } from './dto/create-dadosCatadot.dto';
import { NotFoundError } from 'rxjs';
import { UpdateDadosCatadorDto } from './dto/update-dadosCatador.dto';

@Injectable()
export class DadosCatadorService {
    constructor(
        @InjectRepository(DadosCatador)
        private dadosCatadorRepository: Repository<DadosCatador>,
        @InjectRepository(Catador)
        private catadorRepository: Repository<Catador>,
    ) {}

    async atualizarDados(updateDto: Partial<UpdateDadosCatadorDto>, catadorId: number){
        const dados = await this.dadosCatadorRepository.findOne({
            where: {catador: {id: catadorId}},
            relations: ['catador'], // garante que a relação venha carregada
        });


        if(!dados){
            throw new NotFoundException('Usuário não encontrado');
        }

        if(dados.cpf !== updateDto.cpf) throw new UnauthorizedException('Não é possível mudar seu CPF');

          // Atualiza apenas os campos enviados (cpf, telefone, etc.)
          Object.assign(dados, updateDto);
          return this.dadosCatadorRepository.save(dados);

    }

    findAll(){
        return this.dadosCatadorRepository.find({relations: ['catador']});
    }
}
