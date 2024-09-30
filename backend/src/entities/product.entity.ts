import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Inventory } from "./inventory.entity";
import { Order } from "./order.entity";
import { Store } from "./store.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("decimal")
  price: number;

  @Column("int")
  stock: number;

  @Column()
  category: string;

  // Relación con Inventory
  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory[];

  // Relación con Order
  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  // Relación con Store
  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: "storeId" }) // El nombre de la columna debe ser el correcto en la base de datos
  store: Store;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
