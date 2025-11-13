import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule {}
