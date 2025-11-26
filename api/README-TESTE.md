# 🧪 Plano de Testes – Aplicação RecyTech

**Responsável:** Otávio Monteiro

## 1️⃣ Objetivo do Plano de Testes

Garantir que a aplicação **funcione corretamente**, atendendo aos requisitos do usuário e evitando falhas críticas.
O plano contempla três tipos de testes: **unitários, integração e aceitação do usuário**, com pelo menos dois testes de cada tipo, e inclui **automação de teste**.

---

## 2️⃣ Testes de Unidade

**Objetivo:** testar funções ou métodos isoladamente, sem dependências externas.

**1. Criação de usuário com sucesso**

```ts
await expect(service.create(dto)).resolves.toHaveProperty('usuario.id');
```

**2. Conflito de email ou nome de usuário**

```ts
await expect(service.create(dtoComEmailDuplicado)).rejects.toThrow(ConflictException);
await expect(service.create(dtoComNomeDuplicado)).rejects.toThrow(ConflictException);
```

**3. Busca de usuário inexistente**

```ts
await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
```

---

## 3️⃣ Testes de Integração

**Objetivo:** testar integração entre módulos (Controller + Service + Repositórios).

**1. Criar usuário via Controller**

```ts
const result = await controller.create(dto);
expect(result).toHaveProperty('usuario.id');
```

**2. Atualizar usuário via Controller**

```ts
const result = await controller.update(1, { nomeCompleto: 'Novo Nome' });
expect(result).toBe('atualizado');
```

**3. Listar usuários via Controller**

```ts
const result = await controller.findAll();
expect(result).toEqual(['u1', 'u2']);
```

---

## 4️⃣ Testes de Aceitação do Usuário (UAT)

**Objetivo:** simular o uso real pelo usuário.

| Ação              | Rota              | Método | Payload                                       | Resultado Esperado             |
| ----------------- | ----------------- | ------ | --------------------------------------------- | ------------------------------ |
| Criar usuário     | `/usuario/create` | POST   | `{ nomeCompleto, nomeUsuario, email, senha }` | Status 201 + ID e dados do usuário     |
| Listar usuários   | `/usuario/todos`  | GET    | -                                             | Status 200 + array de usuários |
| Atualizar usuário | `/usuario/1`      | PUT    | `{ nomeCompleto, nomeUsuario }`               | Status 200 + dados atualizados |
| Deletar usuário   | `/usuario/1`      | DELETE | -                                             | Status 200 + usuário deletado  |

**Exemplo de teste E2E**

```ts
return request(app.getHttpServer())
  .post('/usuario/create')
  .send({
    nomeCompleto: 'Teste',
    nomeUsuario: 'uat1',
    email: 'uat1@email.com',
    senha: '123456'
  })
  .expect(201);
```

---

## 5️⃣ Automação de Teste

**Ferramentas:** Jest + Supertest (NestJS E2E)
**Teste automatizado escolhido:** criação de usuário via endpoint (`POST /usuario/create`)

**Como executar**

```bash
# Rodar todos os testes unitários e de integração
npm run test

# Rodar testes E2E / aceitação do usuário
npm run test:e2e

# Rodar testes específicos
npm run test src/Usuario/controller/usuario.controller.spec.ts

npm run test src/Usuario/service/usuario.service.spec.ts

```

---

## 6️⃣ Conclusão

* Todos os tipos de teste foram implementados: **unidade, integração e aceitação**.
* Pelo menos **dois testes de cada tipo** foram criados.
* Teste de aceitação está automatizado e pronto para execução.


