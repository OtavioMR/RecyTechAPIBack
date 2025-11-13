import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm";
import { Usuario } from "src/Usuario/entity/usuario.entity";
import { Catador } from "src/catador/entity/catador.entity";
import { EnderecoUsuario } from "src/endereco-usuario/entity/endereco-usuario.entity";
import { ItemPedido } from "src/item-pedido/entity/itemPedido.entity";

@Entity('pedido')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataHora: Date;

    @Column({ default: 'pendente' })
    status: string; // pendente | aceito | concluído | cancelado

    // 🔹 Usuário que criou o pedido
    @ManyToOne(() => Usuario, usuario => usuario.pedido, { eager: true })
    @JoinColumn({ name: 'idUsuario' })
    usuario: Usuario;

    // 🔹 Catador que vai aceitar o pedido
    @ManyToOne(() => Catador, catador => catador.pedidos, { eager: true, nullable: true })
    @JoinColumn({ name: 'idCatador' })
    catador: Catador;

    // 🔹 Endereço de coleta (relacionado ao usuário)
    @ManyToOne(() => EnderecoUsuario, { eager: true })
    @JoinColumn({ name: 'idEndereco' })
    endereco: EnderecoUsuario;

    // 🔹 Lista de tipos e quantidades de lixo (ItemPedido)
    @OneToMany(() => ItemPedido, itemPedido => itemPedido.pedido, { cascade: true })
    itens: ItemPedido[];
}
