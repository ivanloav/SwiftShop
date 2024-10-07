import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "../auth/dto/create-order.dto";
import { UpdateOrderDto } from "../auth/dto/update-order.dto";
import { UpdateOrderStatusDto } from "../auth/dto/update-order-status.dto";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<import("../entities/order.entity").Order[]>;
    findOne(id: number): Promise<import("../entities/order.entity").Order>;
    create(createOrderDto: CreateOrderDto): Promise<import("../entities/order.entity").Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<import("../entities/order.entity").Order>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<import("../entities/order.entity").Order>;
}
//# sourceMappingURL=orders.controller.d.ts.map