import { Module } from '@nestjs/common';
import { DadosCatadorController } from './dados-catador.controller';
import { DadosCatadorService } from './dados-catador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosCatador } from './entity/dados-catador.entity';
import { Catador } from 'src/catador/entity/catador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DadosCatador, Catador])],
  controllers: [DadosCatadorController],
  providers: [DadosCatadorService],
  exports: [DadosCatadorService],
})
export class DadosCatadorModule {}
