import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Catador } from "src/catador/entity/catador.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Dados-Catador')
export class DadosCatador{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: true})
    cpf: string;

    @Column({nullable: true})
    telefone: string; 

    @Column({unique: true})
    email: string;

    @ManyToOne(() => Catador, catador => catador.dadosCatador)
    @JoinColumn()
    catador: Catador;
}