import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdatePutUsuarioDTO } from "./dto/update-put-usuario.dto";
import { UpdatePatchUsuarioDTO } from "./dto/update-patch-usuario.dto";
import { UsuarioService } from "./usuario.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { AuthGuard } from "src/guards/auth.guard";

// @UseInterceptors(LogInterceptor)
@Controller('usuarios')
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService
    ){}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createUsuarioDTO: CreateUsuarioDTO){
        return this.usuarioService.create(createUsuarioDTO);
    }

    @Get()
    async list() {
        return this.usuarioService.listarTodos();
    }

    @Get(':id')
    async show(@ParamId() id: number) {
        return this.usuarioService.listarUm(id);
    }

    @Put(':id')
    async updateTotal(@Body() updatePutUsuarioDTO:UpdatePutUsuarioDTO, @Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.update(id, updatePutUsuarioDTO);
    }

    @Patch(':id')
    async updateParcial(@Body() updatePatchUsuarioDTO:UpdatePatchUsuarioDTO, @Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.updateParcial(id, updatePatchUsuarioDTO);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.usuarioService.remove(id);
    }


}