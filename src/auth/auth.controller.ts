import { Body, Controller, FileTypeValidator, Headers, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegistroDTO } from "./dto/auth-registro.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Cliente } from "src/decorators/cliente.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join, extname } from 'path';
import { AuthForgetDTO } from "./dto/auth-forget.dto";

@Controller('auth')
export class AuthController {
    constructor(
        // private readonly ClienteService: ClienteService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    login(@Body() {email, senha}: AuthLoginDTO){
        return this.authService.login(email, senha);
    }

    @Post('registrar')
    registrar(@Body() body: AuthRegistroDTO){
        return this.authService.registro(body);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Cliente() user){
        return {user};
    }

    @UseInterceptors(FileInterceptor('arquivo'))
    @UseGuards(AuthGuard)
    @Post('file')
    async file(
        @Cliente() user, 
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: 'image/jpeg'}),
                new MaxFileSizeValidator({maxSize: 222000})
            ]
        })) arquivo: Express.Multer.File
    ){
        const extensao = extname(arquivo.originalname);
        const result = await writeFile(join(__dirname, '..', '..', 'storage', 'fotos', `fotos-${user.id}${extensao}`), arquivo.buffer)
        return {arquivo}
        // return {'envio': true}
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email);
    }
}