import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Carro } from './entities/carro.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Concessionaria } from 'src/concessionarias/entities/concessionaria.entity';

@Injectable()
export class CarrosService {
  constructor(
    @InjectRepository(Carro)
    private carroRepository: Repository<Carro>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Concessionaria)
    private concessionariaRepository: Repository<Concessionaria>
  ) {}

  async create(createCarroDto: CreateCarroDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id: createCarroDto.usuarioId });
    if (!usuario) {
      throw new NotFoundException('usuario não encontrado');
    }

    const carro = this.carroRepository.create({
      vendedor: usuario,
      concessionarias: [],
    });

    if (createCarroDto.concessionariaIds && createCarroDto.concessionariaIds.length > 0) {
      const concessionarias = await this.concessionariaRepository.find({
        where: {
          id: In(createCarroDto.concessionariaIds),
        },
      });
      carro.concessionarias = concessionarias;
    }
    return this.carroRepository.save(carro);
  }

  findAll() {
    return this.carroRepository.find({
      relations: ['usuario', 'concessionarias'],
    });
  }

  async findOne(id: number) {
    const carro = await this.carroRepository.findOne({
      where: { id },
      relations: ['usuario', 'concessionarias'],
    });
    if (!carro) {
      throw new NotFoundException(`Carro com ID ${id} não encontrado`);
    }
    return carro;
  }

  async update(id: number, updateCarroDto: UpdateCarroDto) {
  const carro = await this.findOne(id);
  
  if (updateCarroDto.vendedorId) {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: updateCarroDto.vendedorId
      }
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    carro.vendedor = usuario;
  }

  if (updateCarroDto.concessionariaIds && updateCarroDto.concessionariaIds.length > 0) {
    const concessionarias = await this.concessionariaRepository.find({
      where: {
        id: In(updateCarroDto.concessionariaIds),
      },
    });
    carro.concessionarias = concessionarias;
  }

  const usuario = await this.usuarioRepository.findOne({
    where: { id: updateCarroDto.usuarioId },
  });

  return this.carroRepository.save(carro);
}
async remove(id: number) {
  const carro = await this.carroRepository.findOne({ where: { id } });
  if (!carro) {
    throw new NotFoundException(`Carro com ID ${id} não encontrado`);
  }
  return this.carroRepository.remove(carro);
}
}