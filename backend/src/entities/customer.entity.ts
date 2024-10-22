import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "../entities/order.entity";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  customerId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToMany(() => Order, (order) => order.customer)
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
