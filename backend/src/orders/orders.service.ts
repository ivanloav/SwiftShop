import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "src/auth/dto/create-order.dto";
import { UpdateOrderDto } from "src/auth/dto/update-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ["customer", "product"],
    });
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { orderId: id },
      relations: ["customer", "product"],
    });
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.ordersRepository.create({
      ...createOrderDto,
      customer: { customerId: createOrderDto.customerId },
      product: { productId: createOrderDto.productId },
    });
    return this.ordersRepository.save(newOrder);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.ordersRepository.update(id, updateOrderDto);
    return this.ordersRepository.findOneBy({ orderId: id });
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
