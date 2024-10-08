import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { UpdateInventoryDto } from "../auth/dto/update-inventory.dto";
export declare class InventoryService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(product: Product): Promise<Product>;
    update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=inventory.service.d.ts.map