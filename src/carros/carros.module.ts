import { Module } from '@nestjs/common';
import { CarrosService } from './carros.service';
import { CarrosController } from './carros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carro } from './entities/carro.entity';
import { Concessionaria } from 'src/concessionarias/entities/concessionaria.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carro, Usuario, Concessionaria])],
  controllers: [CarrosController],
  providers: [CarrosService],
})
export class CarroModule {}