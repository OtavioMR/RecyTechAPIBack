import { Test, TestingModule } from '@nestjs/testing';
import { VeiculoCatadorController } from './veiculo-catador.controller';

describe('VeiculoCatadorController', () => {
  let controller: VeiculoCatadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculoCatadorController],
    }).compile();

    controller = module.get<VeiculoCatadorController>(VeiculoCatadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
