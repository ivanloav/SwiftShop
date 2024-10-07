import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "src/auth/dto/create-order.dto";
import { UpdateOrderDto } from "src/auth/dto/update-order.dto";
import { Customer } from "../entities/customer.entity";
import { Product } from "../entities/product.entity";
import { UpdateOrderStatusDto } from "src/auth/dto/update-order-status.dto";
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly customerRepository;
    private readonly productRepository;
    constructor(ordersRepository: Repository<Order>, customerRepository: Repository<Customer>, productRepository: Repository<Product>);
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order>;
}
//# sourceMappingURL=orders.service.d.ts.map