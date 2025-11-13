import { Test, TestingModule } from '@nestjs/testing';
import { TipoLixoController } from './tipo-lixo.controller';

describe('TipoLixoController', () => {
  let controller: TipoLixoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoLixoController],
    }).compile();

    controller = module.get<TipoLixoController>(TipoLixoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
