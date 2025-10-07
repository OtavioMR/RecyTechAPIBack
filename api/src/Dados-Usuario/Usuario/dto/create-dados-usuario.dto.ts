export class CreateDadosUsuarioDto {
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  complemento: string;
  usuarioId: number; // referência ao usuário
}
