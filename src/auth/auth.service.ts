import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Repository } from "typeorm";
import { AuthRegistroDTO } from "./dto/auth-registro.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService{

    private issuer = 'login';
    private audience = 'usuarios';

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private readonly usuarioService: UsuarioService,
        private readonly mailerService: MailerService
    ){}

    createToken(user:Usuario){
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                nome: user.nome,
                email: user.email
            }, {
                expiresIn: "10 days",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    checkToken(token: string) {
        try{
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience            
            });
            return data
        } catch (e) {
            throw new BadRequestException(e)
        } 
    }

    async login(email: string, senha: string) {
        const user = await this.usuarioRepository.findOne({
            where: {
                email
            }
        })

        if(!user) {
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }

        if (!await bcrypt.compare(senha, user.senha)){
        // if(senha !== user.senha) {
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }

        return this.createToken(user);
    }

    async registro(data:AuthRegistroDTO) {
        const user = await this.usuarioService.create(data);

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.usuarioRepository.findOne({
            where: {
               email 
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail incorretos.');
        }

        // enviar e-mail
        await this.mailerService.sendMail({
            subject: 'Recuperação de senha',
            to: user.email,
            template: 'forget',
            context: {
                nome: user.nome
            }
        })
        

        return true;
    }

}