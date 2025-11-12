import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { DadosUsuario } from 'src/Dados-Usuario/entity/dados-usuario.entity';
import { map } from 'rxjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(DadosUsuario)
    private dadosUsuarioRepository: Repository<DadosUsuario>,
  ) { }

  async create(dto: CreateUsuarioDto) {
    // Verifica duplicidade de email
    const emailExistente = await this.dadosUsuarioRepository.findOne({ where: { emailUsuario: dto.email } });
    if (emailExistente) throw new ConflictException('Email já cadastrado');

    // Verifica duplicidade de nome de usuário
    const nomeUsuarioExistente = await this.usuarioRepository.findOne({ where: { nomeUsuario: dto.nomeUsuario } });
    if (nomeUsuarioExistente) throw new ConflictException('Nome de usuário já cadastrado');

    // Criptografa a senha
    const randomSalt = await randomInt(10, 16);
    const senhaCriptografada = await bcrypt.hash(dto.senha, randomSalt);

    // Cria e salva usuário
    const usuario = this.usuarioRepository.create({
      nomeCompleto: dto.nomeCompleto,
      nomeUsuario: dto.nomeUsuario,
      senha: senhaCriptografada,
    });
    const usuarioSalvo = await this.usuarioRepository.save(usuario);

    // Cria e salva dados do usuário
    const dadosUsuario = this.dadosUsuarioRepository.create({
      emailUsuario: dto.email,
      usuario: usuarioSalvo,  // relacionamento
    });
    const dadosUsuarioSalvo = await this.dadosUsuarioRepository.save(dadosUsuario);

    // Retorna objeto com os dois registros
    return {
      usuario: usuarioSalvo,
      dadosUsuario: dadosUsuarioSalvo,
    };
  }


  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['dadosUsuario'], });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }


  async update(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);


    // Atualiza campos de Usuario
    if (dto.nomeCompleto) usuario.nomeCompleto = dto.nomeCompleto;
    if (dto.nomeUsuario) usuario.nomeUsuario = dto.nomeUsuario;
    if (dto.senha) {
      const randomSalt = randomInt(10, 16);
      usuario.senha = bcrypt.hashSync(dto.senha, randomSalt);
    }

    await this.usuarioRepository.save(usuario);

    // Atualiza email se houver
    if (dto.email) {
      // Checa se já existe
      const emailExistente = await this.dadosUsuarioRepository.findOne({ where: { emailUsuario: dto.email } });
      if (emailExistente && emailExistente.usuario.id !== id) {
        throw new ConflictException('Email já está sendo usado por outro usuário');
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

  async findByEmail(email: string) {
    return this.dadosUsuarioRepository.findOne({
      where: { emailUsuario: email },
      relations: ['usuario'], // inclui o relacionamento
    });
  }

}
