import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tipo_lixo')
export class TipoLixo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string; // Ex: "Plástico", "Papel", "Vidro"
}
