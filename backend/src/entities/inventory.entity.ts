import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("inventory")
export class Inventory {
  @PrimaryGeneratedColumn()
  inventoryId: number;

  // Relación con Product
  @ManyToOne(() => Product, (product) => product.inventories)
  @JoinColumn({ name: "productId" }) // El nombre de la columna debe ser el correcto en la base de datos
  product: Product;

  @Column("int")
  quantity: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
