import { Test, TestingModule } from '@nestjs/testing';
import { ItemPedidoService } from './item-pedido.service';

describe('ItemPedidoService', () => {
  let service: ItemPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemPedidoService],
    }).compile();

    service = module.get<ItemPedidoService>(ItemPedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
