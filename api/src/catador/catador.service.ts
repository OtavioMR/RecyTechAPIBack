import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catador } from './entity/catador.entity';
import { Repository } from 'typeorm';
import { CreateCatadorDto } from './dto/create-catador.dto';
import { randomInt } from 'crypto';
import * as bcrypt from "bcrypt";
import { DadosCatador } from 'src/dados-catador/entity/dados-catador.entity';

@Injectable()
export class CatadorService {
    constructor(
        @InjectRepository(Catador)
        private catadorRepository: Repository<Catador>,
        @InjectRepository(DadosCatador)
        private dadosCatadorRepository: Repository<DadosCatador>,
    ) { }

    async create(dto: CreateCatadorDto) {

        const emailExistente = await this.dadosCatadorRepository.findOne({ 
            where: { email: dto.email },
            relations: ['catador'],
         });

        if (emailExistente) {
            throw new ConflictException('Já existe um usuário com este email');
        }

        const nomeCatador = await this.catadorRepository.findOne({ where: { nomeUsuario: dto.nomeUsuario } });
        if (nomeCatador) {
            throw new ConflictException('Já existe um usuário com este nome');
        }

        // Gera o hash da senha usando bcrypt com salt rounds 10 a 16
        const randomSalt = await randomInt(10, 16);

        const senhaCriptografada = await bcrypt.hash(dto.senha, randomSalt);
        dto.senha = senhaCriptografada;


        // Cria e salva usuário
        const usuario = this.catadorRepository.create({
            nomeCompleto: dto.nomeCompleto,
            nomeUsuario: dto.nomeUsuario,
            senha: dto.senha,
        });
        const usuarioSalvo = await this.catadorRepository.save(usuario);


        // Cria e salva dados do usuário
        const dadosUsuario = this.dadosCatadorRepository.create({
            email: dto.email,
            catador: usuarioSalvo, //relacionamento
        });
        const dadosUsuarioSalvo = await this.dadosCatadorRepository.save(dadosUsuario);

        // Retorna objeto com os dois registros
        return {
            usuario: usuarioSalvo,
            dadosUsuario: dadosUsuarioSalvo,
        };
    }

    async findAll() {
        return await this.dadosCatadorRepository.find({ relations: ['catador'] });
    }

    async findOne(id: number) {
        const catador = await this.catadorRepository.findOne({ where: { id } });
        if (!catador) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return catador;
    }

    async findByEmail(email: string) {
        return this.dadosCatadorRepository.findOne({ 
            where: { email },
            relations: ['catador']
         });
    }
}
