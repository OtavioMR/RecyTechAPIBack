import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DadosUsuario } from '../entity/dados-usuario.entity';
import { CreateDadosUsuarioDto } from '../dto/create-dados-usuario.dto';
import { UpdateDadosUsuarioDto } from '../dto/update-dados-usuario';
import { Usuario } from '../../Usuario/entity/usuario.entity';

@Injectable()
export class DadosUsuarioService {
  constructor(
    @InjectRepository(DadosUsuario)
    private dadosUsuarioRepository: Repository<DadosUsuario>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

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

  // UPDATE parcial dos dados do usuário
  async updateDados(updateDto: Partial<CreateDadosUsuarioDto>, usuarioId: number) {
    // Busca os dados já existentes
    const dados = await this.dadosUsuarioRepository.findOne({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'], // garante que a relação venha carregada
    });

    if (!dados) {
      throw new NotFoundException('Dados do usuário não encontrados');
    }

    // Atualiza apenas os campos enviados (cpf, telefone, etc.)
    Object.assign(dados, updateDto);

    return this.dadosUsuarioRepository.save(dados);
  }

  // DELETE
  async remove(id: number) {
    const dados = await this.findOne(id);
    return this.dadosUsuarioRepository.remove(dados);
  }

}
