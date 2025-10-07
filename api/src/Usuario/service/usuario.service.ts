import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  create(dto: CreateUsuarioDto) {
    const usuario = this.usuarioRepo.create(dto);
    return this.usuarioRepo.save(usuario);
  }

  findAll() {
    return this.usuarioRepo.find();
  }

  findOne(id: number) {
    return this.usuarioRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    await this.usuarioRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.usuarioRepo.delete(id);
  }
}
