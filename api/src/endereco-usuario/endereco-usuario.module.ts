import { Module } from '@nestjs/common';
import { EnderecoUsuarioService } from './endereco-usuario.service';
import { EnderecoUsuarioController } from './endereco-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/Usuario/entity/usuario.entity';
import { EnderecoUsuario } from './entity/endereco-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, EnderecoUsuario])],
  providers: [EnderecoUsuarioService],
  controllers: [EnderecoUsuarioController],
  exports: [EnderecoUsuarioService],
})
export class EnderecoUsuarioModule {}
