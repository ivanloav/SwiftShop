// dashboard.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { Order } from "../entities/order.entity";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async getTopProducts(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.orders", "order")
      .select([
        "product.productId",
        "product.name",
        "product.price",
        "product.image",
      ])
      .addSelect("SUM(order.quantity)", "totalQuantity")
      .groupBy("product.productId")
      .orderBy("totalQuantity", "DESC")
      .limit(4)
      .getRawMany();
  }
}
