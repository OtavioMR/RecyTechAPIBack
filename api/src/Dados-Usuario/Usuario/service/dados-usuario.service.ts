import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DadosUsuario } from '../entity/dados-usuario.entity';
import { CreateDadosUsuarioDto } from '../dto/create-dados-usuario.dto';
import { UpdateDadosUsuarioDto } from '../dto/update-dados-usuario';
import { Usuario } from '../../../Usuario/entity/usuario.entity';

@Injectable()
export class DadosUsuarioService {
  constructor(
    @InjectRepository(DadosUsuario)
    private dadosUsuarioRepository: Repository<DadosUsuario>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  // CREATE
  async create(createDto: CreateDadosUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id: createDto.usuarioId });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    const dados = this.dadosUsuarioRepository.create({ ...createDto, usuario });
    return this.dadosUsuarioRepository.save(dados);
  }

  // READ ALL
  findAll() {
    return this.dadosUsuarioRepository.find({ relations: ['usuario'] });
  }

  // READ ONE
  async findOne(id: number) {
    const dados = await this.dadosUsuarioRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!dados) throw new NotFoundException('Dados do usuário não encontrados');
    return dados;
  }

  // UPDATE
  async update(id: number, updateDto: UpdateDadosUsuarioDto) {
    const dados = await this.findOne(id);
    Object.assign(dados, updateDto);
    return this.dadosUsuarioRepository.save(dados);
  }

  // DELETE
  async remove(id: number) {
    const dados = await this.findOne(id);
    return this.dadosUsuarioRepository.remove(dados);
  }

}
