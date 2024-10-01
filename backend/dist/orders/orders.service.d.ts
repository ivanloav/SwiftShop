import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "src/auth/dto/create-order.dto";
import { UpdateOrderDto } from "src/auth/dto/update-order.dto";
export declare class OrdersService {
    private readonly ordersRepository;
    findOne(id: number): Promise<Order>;
    constructor(ordersRepository: Repository<Order>);
    findAll(): Promise<Order[]>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: number): Promise<void>;
}
//# sourceMappingURL=orders.service.d.ts.map