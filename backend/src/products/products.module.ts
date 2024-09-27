import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity"; // La entidad de producto
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Asegúrate de registrar la entidad
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
