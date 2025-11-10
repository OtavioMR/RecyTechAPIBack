import { Module } from '@nestjs/common';
import { CatadorController } from './catador.controller';
import { CatadorService } from './catador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catador } from './entity/catador.entity';
import { DadosCatador } from 'src/dados-catador/entity/dados-catador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catador, DadosCatador])],
  controllers: [CatadorController],
  providers: [CatadorService],
  exports: [CatadorService],
})
export class CatadorModule {}