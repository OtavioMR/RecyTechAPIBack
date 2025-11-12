import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './service/usuario.service';
import { Usuario } from './entity/usuario.entity';
import { DadosCatador } from 'src/dados-catador/entity/dados-catador.entity';
import { DadosUsuario } from 'src/Dados-Usuario/entity/dados-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, DadosUsuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
