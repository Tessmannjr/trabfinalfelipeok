import { ArrayUnique, IsArray, IsNumber, IsOptional } from "class-validator";

export class CreateCarroDto {
    @IsNumber()
    usuarioId: number;

    @IsArray()
    @ArrayUnique()
    @IsOptional()
    concessionariaIds: number[];
}