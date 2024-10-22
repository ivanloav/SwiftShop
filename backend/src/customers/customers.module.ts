import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "../entities/customer.entity";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [TypeOrmModule], // Exportar TypeOrmModule para que otros módulos puedan usar CustomerRepository
})
export class CustomersModule {}
