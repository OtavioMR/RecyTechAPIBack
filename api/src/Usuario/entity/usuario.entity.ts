import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { DadosUsuario } from '../../Dados-Usuario/Usuario/entity/dados-usuario.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCompleto: string;

  @Column()
  nomeUsuario: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToOne(() => DadosUsuario, (dadosUsuario) => dadosUsuario.usuario)
  dadosUsuario: DadosUsuario;
}