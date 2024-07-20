import { IsNumber } from "class-validator";

export class CreateVendedorDto {

    @IsNumber()
    usuarioId: number
}
