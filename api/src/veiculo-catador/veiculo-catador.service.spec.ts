import { Test, TestingModule } from '@nestjs/testing';
import { VeiculoCatadorService } from './veiculo-catador.service';

describe('VeiculoCatadorService', () => {
  let service: VeiculoCatadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculoCatadorService],
    }).compile();

    service = module.get<VeiculoCatadorService>(VeiculoCatadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
