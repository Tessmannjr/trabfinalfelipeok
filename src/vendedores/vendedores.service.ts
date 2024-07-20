import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { UpdateVendedorDto } from './dto/update-vendedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendedor } from './entities/vendedor.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Injectable()
export class VendedoresService {

    constructor(
        @InjectRepository(Vendedor)
        private vendedorRepository: Repository<Vendedor>,
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>
    ) { }

    async create(createVendedorDto: CreateVendedorDto) {
        const cliente = await this.clienteRepository.findOneBy({ id: createVendedorDto.clienteId });
        if (!cliente) {
            throw new Error('Usuário não encontrado');
        }

        const vendedor = this.vendedorRepository.create({
            cliente
        });

        return this.vendedorRepository.save(vendedor);
    }

    findAll() {
        return this.vendedorRepository.find({
            relations: ['cliente', 'turmas']
        });
    }

    async findOne(id: number) {
        const vendedor = await this.vendedorRepository.findOne({
            where: { id },
            relations: ['cliente', 'turmas']
        });

        if (!vendedor) {
            throw new NotFoundException(`Vendedor com ID ${id} não encontrado`);
        }

        return vendedor;
    }

    async update(id: number, updateVendedorDto: UpdateVendedorDto) {
        const vendedor = await this.findOne(id);
        if (updateVendedorDto.clienteId) {
            const cliente = await this.clienteRepository.findOneBy({ id: updateVendedorDto.clienteId });
            if (!cliente) {
                throw new Error('Usuário não encontrado');
            }
            vendedor.cliente = cliente;
        }
        return this.vendedorRepository.save(vendedor);
    }

    async remove(id: number) {
        const result = await this.vendedorRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Vendedor com ID ${id} não encontrado`);
        }
        return result;
    }
}