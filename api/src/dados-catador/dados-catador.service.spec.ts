import { Test, TestingModule } from '@nestjs/testing';
import { DadosCatadorService } from './dados-catador.service';

describe('DadosCatadorService', () => {
  let service: DadosCatadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosCatadorService],
    }).compile();

    service = module.get<DadosCatadorService>(DadosCatadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
