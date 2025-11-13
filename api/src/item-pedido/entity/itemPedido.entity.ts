import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Pedido } from "src/pedido/entity/pedido.entity";
import { TipoLixo } from "src/tipo-lixo/entity/tipoLixo.entity";

@Entity('item_pedido')
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  // 🔹 Quantidade categorizada (pouco, médio, muito)
  @Column({ type: 'enum', enum: ['pouco', 'medio', 'muito'] })
  quantidade: 'pouco' | 'medio' | 'muito';

  // 🔹 Tipo de lixo (ex: papel, plástico, vidro)
  @ManyToOne(() => TipoLixo, { eager: true })
  @JoinColumn({ name: 'idTipoLixo' })
  tipoLixo: TipoLixo;

  // 🔹 Pedido ao qual esse item pertence
  @ManyToOne(() => Pedido, pedido => pedido.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;
}
