import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;
}
