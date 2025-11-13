import { Test, TestingModule } from '@nestjs/testing';
import { TipoLixoService } from './tipo-lixo.service';

describe('TipoLixoService', () => {
  let service: TipoLixoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoLixoService],
    }).compile();

    service = module.get<TipoLixoService>(TipoLixoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
