import { Module } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { VendedorController } from './vendedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedor } from './entities/vendedor.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendedor, Usuario])],
  controllers: [VendedorController],
  providers: [VendedoresService],
})
export class VendedorModule {}