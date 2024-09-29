import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "../customers/customer.entity";
import { Product } from "./product.entity"; // Importar Product

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column("int")
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  total: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
