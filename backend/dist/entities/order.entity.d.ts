import { Customer } from "./customer.entity";
import { Product } from "./product.entity";
export declare class Order {
    orderId: number;
    customer: Customer;
    product: Product;
    quantity: number;
    total: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=order.entity.d.ts.map