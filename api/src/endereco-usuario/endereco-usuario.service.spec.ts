import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoUsuarioService } from './endereco-usuario.service';

describe('EnderecoUsuarioService', () => {
  let service: EnderecoUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnderecoUsuarioService],
    }).compile();

    service = module.get<EnderecoUsuarioService>(EnderecoUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
