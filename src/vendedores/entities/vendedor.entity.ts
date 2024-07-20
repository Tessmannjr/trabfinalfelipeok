import { Carro } from "src/carros/entities/carro.entity";
import { Cliente } from "src/clientes/entities/cliente.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendedor {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(() => Cliente)
    @JoinColumn()
    cliente: Cliente

    @OneToMany(() => Carro, carro => carro.vendedor)
    carros: Carro[];
}