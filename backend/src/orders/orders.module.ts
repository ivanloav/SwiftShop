import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Order } from "../entities/order.entity";
import { Customer } from "../entities/customer.entity";
import { Product } from "../entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer, Product])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
