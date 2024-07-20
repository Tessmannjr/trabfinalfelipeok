import { Module } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { VendedorController } from './vendedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedor } from './entities/vendedor.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendedor, Cliente])],
  controllers: [VendedorController],
  providers: [VendedoresService],
})
export class VendedorModule {}