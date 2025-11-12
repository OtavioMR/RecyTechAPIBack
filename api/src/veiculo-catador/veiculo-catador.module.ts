import { Module } from '@nestjs/common';
import { VeiculoCatadorController } from './veiculo-catador.controller';
import { VeiculoCatadorService } from './veiculo-catador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catador } from 'src/catador/entity/catador.entity';
import { VeiculoCatador } from './entity/veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catador, VeiculoCatador])],
  controllers: [VeiculoCatadorController],
  providers: [VeiculoCatadorService],
  exports: [VeiculoCatadorService],
})
export class VeiculoCatadorModule {}
