import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { CreateProductDto } from "./create-product.dto";
import { UpdateProductDto } from "./update-product.dto";
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<void>;
}
//# sourceMappingURL=products.service.d.ts.map