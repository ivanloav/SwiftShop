import { ProductsService } from "./products.service";
import { CreateProductDto } from "../auth/dto/create-product.dto";
import { UpdateProductDto } from "../auth/dto/update-product.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<import("../entities/product.entity").Product[]>;
    findOne(id: number): Promise<import("../entities/product.entity").Product>;
    create(product: CreateProductDto): Promise<import("../entities/product.entity").Product>;
    update(id: number, product: UpdateProductDto): Promise<import("../entities/product.entity").Product>;
    remove(id: number): Promise<void>;
}
//# sourceMappingURL=products.controller.d.ts.map