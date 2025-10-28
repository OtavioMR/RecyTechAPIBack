export class CreateEnderecoUsuarioDto {
    endereco: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento: string;
    usuarioId: number; // referência ao usuário
}