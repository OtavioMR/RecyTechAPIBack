import { Test, TestingModule } from '@nestjs/testing';
import { DadosCatadorController } from './dados-catador.controller';

describe('DadosCatadorController', () => {
  let controller: DadosCatadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosCatadorController],
    }).compile();

    controller = module.get<DadosCatadorController>(DadosCatadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
