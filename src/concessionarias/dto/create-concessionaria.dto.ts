import { ArrayUnique, IsArray, IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateConcessionariaDto {

    @IsString()
    nome: string

    @IsNumber()
    ano: number

    @IsNumber()
    semestre: number

    @IsString()
    curso: string

    @IsInt()
    @IsOptional()
    vendedorId?: number

    @IsArray()
    @ArrayUnique()
    @IsOptional()
    carroIds?: number[];
}