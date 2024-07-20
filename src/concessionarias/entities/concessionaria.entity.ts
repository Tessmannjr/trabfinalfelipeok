import { Carro } from "src/carros/entities/carro.entity"
import { Vendedor } from "src/vendedores/entities/vendedor.entity"
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Concessionaria {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @Column()
    ano: number

    @Column()
    semestre: number

    @ManyToOne(() => Vendedor, vendedor => vendedor.concessionarias)
    vendedor: Vendedor;

    @ManyToMany(() => Carro, carro => carro.concessionarias)
    carros: Carro[];

    @Column()
    curso: string

    @CreateDateColumn()
    createdAt:string

    @UpdateDateColumn()
    updatedAt:string
}