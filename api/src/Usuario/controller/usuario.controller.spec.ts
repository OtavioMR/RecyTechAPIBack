import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

// mock do guard para não bloquear testes
class MockJwtAuthGuard {
  canActivate() {
    return true;
  }
}

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  const mockUsuarioService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    })
      .overrideGuard(MockJwtAuthGuard) // ignora o guard
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um usuário', async () => {
    const dto: CreateUsuarioDto = {
      nomeCompleto: 'Otávio Monteiro',
      nomeUsuario: 'otavio123',
      email: 'otavio@email.com',
      senha: '123456',
    };

    mockUsuarioService.create.mockResolvedValue('usuário criado');

    const result = await controller.create(dto);
    expect(result).toBe('usuário criado');
    expect(mockUsuarioService.create).toHaveBeenCalledWith(dto);
  });

  it('deve retornar todos os usuários', async () => {
    mockUsuarioService.findAll.mockResolvedValue(['u1', 'u2']);

    const result = await controller.findAll();
    expect(result).toEqual(['u1', 'u2']);
    expect(mockUsuarioService.findAll).toHaveBeenCalled();
  });

  it('deve retornar o usuário logado', async () => {
    const req = { user: { id: 1 } };
    mockUsuarioService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne(req);
    expect(result).toEqual({ id: 1 });
    expect(mockUsuarioService.findOne).toHaveBeenCalledWith(1);
  });

  it('deve atualizar um usuário', async () => {
    const dto: UpdateUsuarioDto = { nomeCompleto: 'Novo Nome' };
    mockUsuarioService.update.mockResolvedValue('atualizado');

    const result = await controller.update(1, dto);
    expect(result).toBe('atualizado');
    expect(mockUsuarioService.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve deletar um usuário', async () => {
    mockUsuarioService.remove.mockResolvedValue('deletado');

    const result = await controller.remove(1);
    expect(result).toBe('deletado');
    expect(mockUsuarioService.remove).toHaveBeenCalledWith(1);
  });
});
