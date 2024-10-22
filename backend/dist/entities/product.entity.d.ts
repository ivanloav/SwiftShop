import { Inventory } from "./inventory.entity";
import { Order } from "./order.entity";
import { Store } from "./store.entity";
export declare class Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    store: Store;
    inventories: Inventory[];
    orders: Order[];
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=product.entity.d.ts.map