import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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
  created_at: Date;

  @Column()
  updated_at: Date;
}
