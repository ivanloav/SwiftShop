import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./product.entity"; // Importar Product

@Entity("stores")
export class Store {
  @PrimaryGeneratedColumn()
  storeId: number;

  @Column()
  name: string;

  @Column()
  owner: string;
  /*
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
*/
  // Relación con Product
  @OneToMany(() => Product, (product) => product.store) // Define la relación inversa
  products: Product[];
}
