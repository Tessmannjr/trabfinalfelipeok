import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database.providers';
import { ProfessorModule } from './vendedores/vendedores.module';
import { AlunoModule } from './carros/carros.module';
import { TurmaModule } from './concessionarias/concessionarias.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

@Module({
  imports: [
    UsuarioModule, 
    ProfessorModule, 
    AlunoModule,
    TurmaModule,
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
        from: '"Aula Senac" <alfred.little6@ethereal.email>'
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
