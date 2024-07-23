import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { UpdateVendedorDto } from './dto/update-vendedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendedor } from './entities/vendedor.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class VendedoresService {

    constructor(
        @InjectRepository(Vendedor)
        private vendedorRepository: Repository<Vendedor>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) { }

    async create(createVendedorDto: CreateVendedorDto) {
        const usuario = await this.usuarioRepository.findOneBy({ id: createVendedorDto.usuarioId });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        const vendedor = this.vendedorRepository.create({
            usuario
        });

        return this.vendedorRepository.save(vendedor);
    }

    findAll() {
        return this.vendedorRepository.find({
            relations: ['usuario', 'turmas']
        });
    }

    async findOne(id: number) {
        const vendedor = await this.vendedorRepository.findOne({
            where: { id },
            relations: ['usuario', 'turmas']
        });

        if (!vendedor) {
            throw new NotFoundException(`Vendedor com ID ${id} não encontrado`);
        }

        return vendedor;
    }

    async update(id: number, updateVendedorDto: UpdateVendedorDto) {
        const vendedor = await this.findOne(id);
        if (updateVendedorDto.usuarioId) {
            const usuario = await this.usuarioRepository.findOneBy({ id: updateVendedorDto.usuarioId });
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            vendedor.usuario = usuario;
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