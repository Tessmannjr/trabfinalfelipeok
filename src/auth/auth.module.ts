import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioModule } from "src/usuario/usuario.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: "p0pZFn3x>inY.'=2s#c2'j5bi*t^B96&"
        }),
        forwardRef(() => UsuarioModule),
        TypeOrmModule.forFeature([Usuario])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {

}