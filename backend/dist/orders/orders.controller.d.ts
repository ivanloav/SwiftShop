import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "../auth/dto/create-order.dto";
import { UpdateOrderDto } from "../auth/dto/update-order.dto";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): any[];
    findOne(id: number): any;
    create(createOrderDto: CreateOrderDto): any;
    update(id: number, updateOrderDto: UpdateOrderDto): any;
    remove(id: number): {
        message: string;
    };
}
//# sourceMappingURL=orders.controller.d.ts.map