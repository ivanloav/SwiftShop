import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { CreateProductDto } from "../auth/dto/create-product.dto";
import { UpdateProductDto } from "../auth/dto/update-product.dto";
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<void>;
}
//# sourceMappingURL=products.service.d.ts.map