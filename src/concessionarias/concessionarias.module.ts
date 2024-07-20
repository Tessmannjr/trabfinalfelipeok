import { Module } from '@nestjs/common';
import { ConcessionariaService } from './concessionarias.service';
import { ConcessionariaController } from './concessionarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concessionaria } from './entities/concessionaria.entity';
import { Carro } from 'src/carros/entities/carro.entity';
import { Vendedor } from 'src/vendedores/entities/vendedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concessionaria, Carro, Vendedor])],
  controllers: [ConcessionariaController],
  providers: [ConcessionariaService],
})
export class ConcessionariaModule {}