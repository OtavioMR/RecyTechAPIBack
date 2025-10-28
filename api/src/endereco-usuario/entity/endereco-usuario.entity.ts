import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../Usuario/entity/usuario.entity';

@Entity('EnderecoUsuario')
export class EnderecoUsuario {
    // Definição das colunas e relacionamentos da entidade EnderecoUsuario
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    endereco: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    cep: string;

    @Column()
    complemento: string;

    @OneToOne(() => Usuario, usuario => usuario.enderecoUsuario)
    @JoinColumn()
    usuario: Usuario;
}