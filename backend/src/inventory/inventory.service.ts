import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity"; // Importa la entidad Product
import { UpdateInventoryDto } from "../auth/dto/update-inventory.dto"; // Importa el DTO para actualizar productos

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  // Método para obtener todos los productos, incluyendo la tienda relacionada (store)
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ["store"], // Asegúrate de incluir la relación con la tienda (store)
    });
  }

  // Método para obtener un producto por su ID, incluyendo la tienda relacionada (store)
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { productId: id },
      relations: ["store"], // Asegúrate de incluir la relación con la tienda (store)
    });
  }

  // Método para crear un nuevo producto en la base de datos
  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  // Método para actualizar un producto existente
  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto
  ): Promise<Product> {
    await this.productRepository.update(id, updateInventoryDto);
    return this.productRepository.findOne({
      where: { productId: id },
      relations: ["store"], // Incluye la tienda en la respuesta de actualización
    });
  }

  // Método para eliminar un producto de la base de datos
  async remove(id: number): Promise<{ message: string }> {
    await this.productRepository.delete(id);
    return { message: "Producto eliminado exitosamente." };
  }
}
