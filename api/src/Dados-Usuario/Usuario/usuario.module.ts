import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosUsuarioService } from './service/dados-usuario.service';
import { DadosUsuarioController } from './controller/dados-usuario.controller';
import { DadosUsuario } from './entity/dados-usuario.entity';
import { Usuario } from '../../Usuario/entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DadosUsuario, Usuario])],
  providers: [DadosUsuarioService],
  controllers: [DadosUsuarioController],
  exports: [DadosUsuarioService],
})
export class DadosUsuarioModule {}
