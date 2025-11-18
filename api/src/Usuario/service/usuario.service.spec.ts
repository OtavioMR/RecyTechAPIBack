import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const mockUsuarioRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockDadosUsuarioRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,

        // PROVE A INSTÂNCIA DOS REPOSITÓRIOS MOCKADOS
        {
          provide: 'UsuarioRepository',
          useValue: mockUsuarioRepository,
        },
        {
          provide: 'DadosUsuarioRepository',
          useValue: mockDadosUsuarioRepository,
        },
      ],
    })
      // override obrigatório se você estiver usando InjectRepository()
      .overrideProvider('UsuarioRepository')
      .useValue(mockUsuarioRepository)
      .overrideProvider('DadosUsuarioRepository')
      .useValue(mockDadosUsuarioRepository)
      .compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------- TESTES COMEÇAM AQUI ----------

  it('deve lançar erro se o email já estiver cadastrado', async () => {
    mockDadosUsuarioRepository.findOne.mockResolvedValue({ emailUsuario: 'teste@gmail.com' });

    await expect(
      service.create({
        nomeCompleto: 'Otavio',
        nomeUsuario: 'otavio123',
        email: 'teste@gmail.com',
        senha: '123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar erro se o nome de usuário já existir', async () => {
    mockDadosUsuarioRepository.findOne.mockResolvedValue(null);
    mockUsuarioRepository.findOne.mockResolvedValue({ nomeUsuario: 'otavio123' });

    await expect(
      service.create({
        nomeCompleto: 'Otavio',
        nomeUsuario: 'otavio123',
        email: 'novo@gmail.com',
        senha: '123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve criar um usuário com sucesso', async () => {
    mockDadosUsuarioRepository.findOne.mockResolvedValue(null);
    mockUsuarioRepository.findOne.mockResolvedValue(null);

    mockUsuarioRepository.create.mockReturnValue({ id: 1 });
    mockUsuarioRepository.save.mockResolvedValue({ id: 1, nomeUsuario: 'otavio' });

    mockDadosUsuarioRepository.create.mockReturnValue({ id: 2 });
    mockDadosUsuarioRepository.save.mockResolvedValue({
      id: 2,
      emailUsuario: 'email@teste.com',
    });

    const result = await service.create({
      nomeCompleto: 'Otavio',
      nomeUsuario: 'otavio',
      email: 'email@teste.com',
      senha: '123',
    });

    expect(result.usuario.id).toBe(1);
    expect(result.dadosUsuario.id).toBe(2);
  });

  it('deve lançar erro se o usuário não existir ao buscar', async () => {
    mockUsuarioRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
