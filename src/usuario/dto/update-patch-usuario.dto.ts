import { PartialType } from "@nestjs/mapped-types";
import { CreateUsuarioDTO } from "./create-usuario.dto"

export class UpdatePatchUsuarioDTO extends PartialType(CreateUsuarioDTO) {

}