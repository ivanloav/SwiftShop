import { Inventory } from "../inventory/inventory.entity";
import { Order } from "../orders/order.entity";
import { Store } from "../stores/store.entity";
export declare class Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    inventory: Inventory[];
    orders: Order[];
    store: Store;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=product.entity.d.ts.map