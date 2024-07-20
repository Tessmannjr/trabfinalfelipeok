import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Column } from "typeorm"
import { Usuario } from "src/usuario/entities/usuario.entity"
import { Concessionaria } from "src/concessionarias/entities/concessionaria.entity"

@Entity()
export class Carro {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    modelo: string

    @Column()
    marca: string

    @Column()
    ano: number

    @Column()
    cor: string

    @Column()
    preco: number

    @OneToOne(() => Usuario)
    @JoinColumn()
    vendedor: Usuario

    @ManyToMany(() => Concessionaria, concessionaria => concessionaria.carros)
    @JoinTable()
    concessionarias: Concessionaria[];
}