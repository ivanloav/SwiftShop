import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "src/auth/dto/create-order.dto";
import { UpdateOrderDto } from "src/auth/dto/update-order.dto";

@Injectable()
export class OrdersService {
  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { orderId: id },
      relations: ["customer", "product"], // Incluye las relaciones necesarias
    });
  }
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
  ) {}

  findAll(): Promise<Order[]> {
    // Usa el método `find` para obtener las órdenes y todas sus relaciones
    return this.ordersRepository.find({
      relations: ["customer", "product"], // Aquí especificas las relaciones a incluir
    });
  }

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Crea una nueva orden y devuélvela
    const newOrder = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(newOrder);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    // Actualiza la orden con el ID proporcionado
    await this.ordersRepository.update(id, updateOrderDto);
    return this.ordersRepository.findOneBy({ orderId: id });
  }

  async remove(id: number): Promise<void> {
    // Elimina la orden con el ID proporcionado
    await this.ordersRepository.delete(id);
  }
}
