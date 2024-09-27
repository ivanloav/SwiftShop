import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryService } from "./inventory.service";
import { InventoryController } from "./inventory.controller";
//import { ProductRepository } from "../products/product.repository"; // Importa el repositorio si es necesario
import { Product } from "../products/product.entity"; // Asegúrate de que la entidad esté disponible

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Importa la entidad Product si es necesario
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
