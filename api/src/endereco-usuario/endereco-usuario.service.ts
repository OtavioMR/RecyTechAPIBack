import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { EnderecoUsuario } from './entity/endereco-usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/Usuario/entity/usuario.entity';
import { Repository } from 'typeorm';
import { CreateEnderecoUsuarioDto } from './dto/create-endereco-usuario.dto';
import { DadosUsuario } from 'src/Dados-Usuario/entity/dados-usuario.entity';

@Injectable()
export class EnderecoUsuarioService {
    constructor(
        @InjectRepository(EnderecoUsuario)
        private enderecoUsuarioRepository: Repository<EnderecoUsuario>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async create(createDto: CreateEnderecoUsuarioDto, usuarioId: number) {
        const usuario = await this.usuarioRepository.findOne({ where: {id: usuarioId} });
        if (!usuario) throw new Error('Usuário não encontrado');

        const endereco = this.enderecoUsuarioRepository.create({ ...createDto, usuario });
        return this.enderecoUsuarioRepository.save(endereco);
    }

    async findAll() {
        return this.enderecoUsuarioRepository.find({ relations: ['usuario'] });
    }

    async findByUsuarioId(usuarioId: number) {
        const endereco = await this.enderecoUsuarioRepository.find({
            where: { usuario: { id: usuarioId } },
            relations: ['usuario'],
        });
        return endereco;
    }
}
