import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database.providers';
import { VendedorModule } from './vendedores/vendedores.module';
import { CarroModule } from './carros/carros.module';
import { ConcessionariaModule } from './concessionarias/concessionarias.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

@Module({
  imports: [
    UsuarioModule, 
    VendedorModule, 
    CarroModule,
    ConcessionariaModule,
    forwardRef(() => AuthModule), 
    TypeOrmModule.forRoot(config),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alfred.little6@ethereal.email',
            pass: 'ZUj5dnrVPVjT4yzxqP'
        }
      },
      defaults: {
        from: '"Revenda" <alfred.little6@ethereal.email>'
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
