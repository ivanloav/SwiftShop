import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): any[];
    findOne(id: number): any;
    create(product: CreateProductDto): any;
    update(id: number, product: UpdateProductDto): any;
    remove(id: number): {
        message: string;
    };
}
//# sourceMappingURL=products.controller.d.ts.map