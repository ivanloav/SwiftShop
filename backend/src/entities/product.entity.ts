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

  @Column()
  image: string;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: "storeId" })
  store: Store;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
