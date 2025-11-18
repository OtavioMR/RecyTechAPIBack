import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { UsuarioController } from '../src/Usuario/controller/usuario.controller';
import { UsuarioService } from '../src/Usuario/service/usuario.service';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Usuario } from '../src/Usuario/entity/usuario.entity';
import { DadosUsuario } from '../src/Dados-Usuario/entity/dados-usuario.entity';
import { EnderecoUsuario } from '../src/endereco-usuario/entity/endereco-usuario.entity';
import { Pedido } from '../src/pedido/entity/pedido.entity';
import { Catador } from '../src/catador/entity/catador.entity';
import { DadosCatador } from '../src/dados-catador/entity/dados-catador.entity';
import { VeiculoCatador } from 'src/veiculo-catador/entity/veiculo.entity';

// Mock básico de repository completo
const mockRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(dto => dto) // ESSENCIAL
};

// Providers para todas entidades que o service exige
const repoProviders = [
  { provide: getRepositoryToken(Usuario), useValue: mockRepo },
  { provide: getRepositoryToken(DadosUsuario), useValue: mockRepo },
  { provide: getRepositoryToken(EnderecoUsuario), useValue: mockRepo },
  { provide: getRepositoryToken(Pedido), useValue: mockRepo },
  { provide: getRepositoryToken(Catador), useValue: mockRepo },
  { provide: getRepositoryToken(DadosCatador), useValue: mockRepo },
  { provide: getRepositoryToken(VeiculoCatador), useValue: mockRepo }
];

// Mock global do JwtAuthGuard (desativa ele)
jest.mock('../src/auth/jwt-auth.guard', () => ({
  JwtAuthGuard: class {
    canActivate() {
      return true; // ignora autenticação no teste
    }
  }
}));

describe('Usuario E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        UsuarioService,
        ...repoProviders
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // --------------------------------------------
  // TESTES
  // --------------------------------------------

  it('POST /usuario/create → deve criar usuário', async () => {
    mockRepo.findOne.mockResolvedValue(null); // sem email duplicado
    mockRepo.save.mockResolvedValue({ id: 1, nomeCompleto: 'Teste' });

    return request(app.getHttpServer())
      .post('/usuario/create')
      .send({
        nomeCompleto: 'Teste',
        nomeUsuario: 'teste',
        senha: '123',
        email: 't@t.com'
      })
      .expect(201);
  });

  it('GET /usuario/todos → deve listar usuários', async () => {
    mockRepo.find.mockResolvedValue([{ id: 1, nomeUsuario: 'teste' }]);

    return request(app.getHttpServer())
      .get('/usuario/todos')
      .expect(200)
      .expect(res => {
        if (!Array.isArray(res.body)) throw new Error('Resposta não é lista');
      });
  });

  it('PUT /usuario/1 → deve atualizar usuário', async () => {
    mockRepo.findOne.mockResolvedValue({ id: 1 });
    mockRepo.save.mockResolvedValue({ id: 1, nomeUsuario: 'novo' });

    return request(app.getHttpServer())
      .put('/usuario/1')
      .send({ nomeUsuario: 'novo' })
      .expect(200);
  });

  it('DELETE /usuario/1 → deve remover usuário', async () => {
    mockRepo.findOne.mockResolvedValue({ id: 1 });
    mockRepo.delete.mockResolvedValue({ affected: 1 });

    return request(app.getHttpServer())
      .delete('/usuario/1')
      .expect(200);
  });
});
