import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { Order } from "../entities/order.entity";
export declare class DashboardService {
    private readonly productRepository;
    private readonly orderRepository;
    constructor(productRepository: Repository<Product>, orderRepository: Repository<Order>);
    getTopProducts(): Promise<Product[]>;
    getSalesData(): Promise<{
        date: any;
        sales: number;
    }[]>;
}
//# sourceMappingURL=dashboard.service.d.ts.map