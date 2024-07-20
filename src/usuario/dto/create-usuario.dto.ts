import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class CreateUsuarioDTO {

    @IsString()
    nome: string

    @IsEmail()
    email: string
    
    @IsStrongPassword({
        minLength: 6,
        minSymbols: 0,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1
    })
    senha: string

}