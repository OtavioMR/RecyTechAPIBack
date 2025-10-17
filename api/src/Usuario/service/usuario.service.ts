import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async create(dto: CreateUsuarioDto) {

    const emailExistente = await this.usuarioRepository.findOne({ where: { email: dto.email} });
    if (emailExistente ) {
      throw new ConflictException('Email já cadastrado');
    }

    const nomeUsuarioExistente = await this.usuarioRepository.findOne({ where: { nomeUsuario: dto.nomeUsuario } });
    if (nomeUsuarioExistente) {
      throw new ConflictException('Nome de usuário já cadastrado');
    }

    // Gera o hash da senha usando bcrypt com salt rounds 10 a 16
    const randomSalt = await randomInt(10,16);

    const senhaCriptografada = await bcrypt.hash(dto.senha, randomSalt);
    dto.senha = senhaCriptografada;

    const usuario = this.usuarioRepository.create(dto);
    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }


  async update(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    // Verifica se há alguma mudança
    const houveMudanca =
      (dto.nomeCompleto && dto.nomeCompleto !== usuario.nomeCompleto) ||
      (dto.nomeUsuario && dto.nomeUsuario !== usuario.nomeUsuario) ||
      // (dto.email && dto.email !== usuario.email) ||
      (dto.senha && dto.senha !== usuario.senha);

    if (!houveMudanca) {
      throw new BadRequestException('Nenhum campo foi alterado');
    }

    //Verifica se o novo e - mail já existe em outro usuário
    if (dto.email && dto.email !== usuario.email) {
      const emailExistente = await this.usuarioRepository.findOne({ where: { email: dto.email } });
      if (emailExistente && emailExistente.id !== id) {
        throw new ConflictException('Email já está sendo usado por outro usuário');
      }
    }

    // Se a senha for alterada, recriptografa
    if (dto.senha && dto.senha !== usuario.senha) {
      const randomSalt = randomInt(10, 16);
      dto.senha = bcrypt.hashSync(dto.senha, randomSalt);
    }

    // Atualiza os dados e retorna o novo usuário
    Object.assign(usuario, dto);
    await this.usuarioRepository.save(usuario);
    return usuario;
  }


  async patch(id: number, dto: UpdateUsuarioDto) {
    return this.update(id, dto);
  }


  async remove(id: number) {

    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.usuarioRepository.delete(id);
  }
}
