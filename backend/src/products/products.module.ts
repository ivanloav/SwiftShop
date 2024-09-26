import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { Product } from "./product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Importa el repositorio de la entidad
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
