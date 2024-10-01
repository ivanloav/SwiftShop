import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Order } from "../entities/order.entity"; // Asegúrate de que la entidad existe

@Module({
  imports: [TypeOrmModule.forFeature([Order])], // Importar la entidad de TypeORM
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
