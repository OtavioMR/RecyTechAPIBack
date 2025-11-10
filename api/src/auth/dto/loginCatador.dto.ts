import { IsEmail, IsString } from "class-validator";

export class LoginCatadorDto{
    @IsEmail()
    email: string;

    @IsString()
    senha: string;
}