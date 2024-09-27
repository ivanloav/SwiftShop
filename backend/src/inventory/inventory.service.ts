import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../products/product.entity"; // Importa la entidad Product
import { UpdateInventoryDto } from "./update-inventory.dto"; // Importa el DTO para actualizar productos

@Injectable()
export class InventoryService {
  // Inyectamos el repositorio de productos de TypeORM
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  // Método para obtener todos los productos desde la base de datos
  async findAll(): Promise<Product[]> {
    return this.productRepository.find(); // Encuentra todos los productos
  }

  // Método para obtener un producto por su ID
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } }); // Encuentra un producto por su ID
  }

  // Método para crear un nuevo producto en la base de datos
  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product); // Guarda un nuevo producto
  }

  // Método para actualizar un producto existente
  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto
  ): Promise<Product> {
    await this.productRepository.update(id, updateInventoryDto); // Usa el DTO correctamente
    return this.productRepository.findOne({ where: { id } }); // Devuelve el producto actualizado
  }

  // Método para eliminar un producto de la base de datos
  async remove(id: number): Promise<{ message: string }> {
    await this.productRepository.delete(id); // Elimina el producto
    return { message: "Producto eliminado exitosamente." };
  }
}
