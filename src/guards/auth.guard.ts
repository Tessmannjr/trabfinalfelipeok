import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService 
    ){}
    
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;
        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1])
            request.tokenPayload = data;
            request.user = await this.usuarioService.listarUm(data.id)
            return true;
        } catch (e) {
            return false;
        }
        
    }
}