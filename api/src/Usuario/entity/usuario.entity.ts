import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { DadosUsuario } from '../../Dados-Usuario/entity/dados-usuario.entity';
import { EnderecoUsuario } from '../../endereco-usuario/entity/endereco-usuario.entity';

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCompleto: string;

  @Column({ unique: true })
  nomeUsuario: string;

  @Column()
  senha: string;

  @OneToOne(() => DadosUsuario, (dadosUsuario) => dadosUsuario.usuario)
  dadosUsuario: DadosUsuario;

  @OneToMany(() => EnderecoUsuario, (enderecoUsuario) => enderecoUsuario.usuario)
  enderecoUsuario: EnderecoUsuario;
}