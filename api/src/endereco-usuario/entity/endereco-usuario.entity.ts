import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../../Usuario/entity/usuario.entity';

@Entity('EnderecoUsuario')
export class EnderecoUsuario {
    // Definição das colunas e relacionamentos da entidade EnderecoUsuario
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    cep: string;

    @Column()
    numero: string;

    @Column()
    logradouro: string;

    @Column({nullable: true})
    complemento: string;

    @ManyToOne(() => Usuario, usuario => usuario.enderecoUsuario)
    @JoinColumn()
    usuario: Usuario;
}