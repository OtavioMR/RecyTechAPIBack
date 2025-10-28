import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoUsuarioController } from './endereco-usuario.controller';

describe('EnderecoUsuarioController', () => {
  let controller: EnderecoUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoUsuarioController],
    }).compile();

    controller = module.get<EnderecoUsuarioController>(EnderecoUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
