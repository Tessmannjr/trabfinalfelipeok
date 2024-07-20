import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        length: 100
    })
    nome: string

    @Column({
        length: 150,
        unique: true
    })
    email: string

    @Column()
    senha: string

    @CreateDateColumn()
    createdAt:string

    @UpdateDateColumn()
    updatedAt:string

}