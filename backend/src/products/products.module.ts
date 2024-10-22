import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [TypeOrmModule], // Exportar TypeOrmModule para que otros módulos puedan usar ProductRepository
})
export class ProductsModule {}
