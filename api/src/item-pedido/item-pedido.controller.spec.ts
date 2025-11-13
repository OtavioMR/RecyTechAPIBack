import { Test, TestingModule } from '@nestjs/testing';
import { ItemPedidoController } from './item-pedido.controller';

describe('ItemPedidoController', () => {
  let controller: ItemPedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemPedidoController],
    }).compile();

    controller = module.get<ItemPedidoController>(ItemPedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
