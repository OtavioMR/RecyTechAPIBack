import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../../Usuario/entity/usuario.entity';

@Entity('dados_usuario')
export class DadosUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column()
  telefone: string;

  @Column()
  complemento: string;

  @OneToOne(() => Usuario, usuario => usuario.dadosUsuario)
  @JoinColumn()
  usuario: Usuario;
}
