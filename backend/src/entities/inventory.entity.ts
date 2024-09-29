import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity("inventory")
export class Inventory {
  @PrimaryGeneratedColumn()
  inventoryId: number;

  @Column("int")
  quantity: number;

  // Relación con Product
  @ManyToOne(() => Product, (product) => product.inventory)
  product: Product;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
