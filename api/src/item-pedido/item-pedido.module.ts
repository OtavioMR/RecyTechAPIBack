import { Module } from '@nestjs/common';
import { ItemPedidoController } from './item-pedido.controller';
import { ItemPedidoService } from './item-pedido.service';

@Module({
  controllers: [ItemPedidoController],
  providers: [ItemPedidoService]
})
export class ItemPedidoModule {}
