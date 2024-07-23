import { ArrayUnique, IsArray, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCarroDto {
    @IsNumber()
    usuarioId: number;

    @IsArray()
    @ArrayUnique()
    @IsOptional()
    concessionariaIds: number[];

    @IsString()
    modelo: string

    @IsString()
    marca: string

    @IsNumber()
    ano: number

    @IsString()
    cor: string

    @IsNumber()
    preco: number

   @IsNumber()
    vendedorId: number
}