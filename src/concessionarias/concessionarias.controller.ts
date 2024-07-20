import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcessionariaService } from './concessionarias.service';
import { CreateConcessionariaDto } from './dto/create-concessionaria.dto';
import { UpdateConcessionariaDto } from './dto/update-concessionaria.dto';

@Controller('concessionarias')
export class ConcessionariaController {
  constructor(private readonly concessionariaService: ConcessionariaService) {}

  @Post()
  create(@Body() createConcessionariaDto: CreateConcessionariaDto) {
    return this.concessionariaService.create(createConcessionariaDto);
  }

  @Get()
  findAll() {
    return this.concessionariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concessionariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConcessionariaDto: UpdateConcessionariaDto) {
    return this.concessionariaService.update(+id, updateConcessionariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concessionariaService.remove(+id);
  }
}