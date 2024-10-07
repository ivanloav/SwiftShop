import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "src/auth/dto/create-order.dto";
import { UpdateOrderDto } from "src/auth/dto/update-order.dto";
import { Customer } from "../entities/customer.entity";
import { Product } from "../entities/product.entity";
import { UpdateOrderStatusDto } from "src/auth/dto/update-order-status.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
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
    const { customerId, productId, ...updateData } = updateOrderDto;

    const order = await this.ordersRepository.findOne({
      where: { orderId: id },
      relations: ["customer", "product"],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (customerId) {
      const customer = await this.customerRepository.findOne({
        where: { customerId: customerId },
      });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      }
      order.customer = customer;
    }

    if (productId) {
      const product = await this.productRepository.findOne({
        where: { productId: productId },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      order.product = product;
    }

    Object.assign(order, updateData);

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  // Nuevo método para actualizar el estado del pedido
  async updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.ordersRepository.findOne({
      where: { orderId: id },
    });
    if (!order) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    order.status = updateOrderStatusDto.status;
    return this.ordersRepository.save(order);
  }
}
