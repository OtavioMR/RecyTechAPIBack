import { identity } from "rxjs";
import { Catador } from "src/catador/entity/catador.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Veiculo-Catador')
export class VeiculoCatador{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    placa: string;

    @Column()
    modelo: string;

    @Column()
    porte: string; //tipo de veículo

    @ManyToOne(() => Catador, catador => catador.veiculoCatador)
    @JoinColumn()
    catador: Catador;


}