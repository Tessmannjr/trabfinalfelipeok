import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { ClienteService } from "src/clientes/clientes.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly clienteService: ClienteService 
    ){}
    
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;
        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1])
            request.tokenPayload = data;
            request.user = await this.clienteService.listarUm(data.id)
            return true;
        } catch (e) {
            return false;
        }
        
    }
}