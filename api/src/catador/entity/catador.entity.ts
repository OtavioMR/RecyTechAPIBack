import { DadosCatador } from "src/dados-catador/entity/dados-catador.entity";
import { VeiculoCatador } from "src/veiculo-catador/entity/veiculo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Catador')
export class Catador{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeCompleto: string;

    @Column({unique: true})
    nomeUsuario: string;

    @Column({unique: true})
    email: string;

    @Column()
    senha: string;

    //Fazer relacionamento com dados do catador

    @OneToMany(() => DadosCatador, (dadosCatador) => dadosCatador.catador)
    dadosCatador: DadosCatador;

    //Fazer relacionamento com os veiculos do catador
    @OneToMany(() => VeiculoCatador, (VeiculoCatador) => VeiculoCatador.catador)
    veiculoCatador: VeiculoCatador;
    
}