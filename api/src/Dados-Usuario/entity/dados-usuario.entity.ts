import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../Usuario/entity/usuario.entity';

@Entity('dados_usuario')
export class DadosUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Column()
  telefone: string;
  
  @OneToOne(() => Usuario, usuario => usuario.dadosUsuario)
  @JoinColumn()
  usuario: Usuario;
}
