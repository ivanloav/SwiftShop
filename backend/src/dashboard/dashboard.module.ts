// dashboard.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { Product } from "../entities/product.entity";
import { Order } from "../entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
