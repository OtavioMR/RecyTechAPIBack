import { Module } from '@nestjs/common';
import { TipoLixoController } from './tipo-lixo.controller';
import { TipoLixoService } from './tipo-lixo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoLixo } from './entity/tipoLixo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoLixo])],
  controllers: [TipoLixoController],
  providers: [TipoLixoService],
  exports: [TipoLixoService],
})
export class TipoLixoModule {}
