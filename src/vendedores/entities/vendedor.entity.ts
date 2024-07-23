import { Carro } from "src/carros/entities/carro.entity";
import { Concessionaria } from "src/concessionarias/entities/concessionaria.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendedor {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario

    @OneToMany(() => Carro, carro => carro.vendedor)
    carros: Carro[];

    @OneToMany(() => Concessionaria, concessionaria => concessionaria.vendedor)
    concessionarias: Concessionaria[]
}