import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConcessionariaDto } from './dto/create-concessionaria.dto';
import { UpdateConcessionariaDto } from './dto/update-concessionaria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Concessionaria } from './entities/concessionaria.entity';
import { In, Repository } from 'typeorm';
import { Vendedor } from 'src/vendedores/entities/vendedor.entity';
import { Carro } from 'src/carros/entities/carro.entity';

@Injectable()
export class ConcessionariaService {

  constructor (
    @InjectRepository(Concessionaria)
    private concessionariaRepository: Repository<Concessionaria>,
    @InjectRepository(Carro)
    private carroRepository: Repository<Carro>,
    @InjectRepository(Vendedor)
    private vendedorRepository: Repository<Vendedor>
  ){}

  async create(createConcessionariaDto: CreateConcessionariaDto) {
    const concessionaria = this.concessionariaRepository.create(createConcessionariaDto);

    let vendedor = null;
    if (createConcessionariaDto.vendedorId){
      vendedor = await this.vendedorRepository.findOne({id: createConcessionariaDto.vendedorId})
      if(!vendedor) {
        throw new Error('Vendedor não encontrado')
      }
      concessionaria.vendedor = vendedor
    }
    
    if (createConcessionariaDto.carroIds && createConcessionariaDto.carroIds.length > 0) {
      const carros = await this.carroRepository.find({
        where: {
          id: In(createConcessionariaDto.carroIds)
        }
      })
      concessionaria.carros = carros;
    }
    
    return this.concessionariaRepository.save(concessionaria);
  }

  findAll() {
    return this.concessionariaRepository.find({relations: ['vendedor', 'carros']});
  }

  async findOne(id: number) {
    const concessionaria = await this.concessionariaRepository.findOne({
      where: {id},
      relations: ['vendedor', 'carros']
    }) 
    if(!concessionaria) {
      throw new NotFoundException(`Concessionaria com ID ${id} não encontrada`);
    }
    return concessionaria;
  }

  async update(id: number, updateConcessionariaDto: UpdateConcessionariaDto) {
    const concessionaria = await this.findOne(id);
    if(!concessionaria) {
      throw new NotFoundException(`Concessionaria com ID ${id} não foi encontrada`);
    }

    if(updateConcessionariaDto.vendedorId){
      const vendedor = await this.vendedorRepository.findOne({id: updateConcessionariaDto.vendedorId})
      if(!vendedor) {
        throw new Error('Vendedor não encontrado')
      }
      concessionaria.vendedor = vendedor;
    }

    if(updateConcessionariaDto.carroIds){
      const carros = await this.carroRepository.find({
        where: { id: In(updateConcessionariaDto.carroIds)}
      })
      concessionaria.carros = carros;
    }

    this.concessionariaRepository.merge(concessionaria, updateConcessionariaDto);
    return this.concessionariaRepository.save(concessionaria);
  }

  async remove(id: number) {
    const result = await this.concessionariaRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`Concessionaria com ID ${id} não encontrada`)
    }
    return result;
  }
}