
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
    private readonly products: any[];

    constructor() {
        const filePath = path.join(__dirname, '../mock-data/products.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        this.products = JSON.parse(fileContents);
    }

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        return this.products.find(product => product.id === id);
    }

    create(product: any) {
        this.products.push(product);
        return product;
    }

    update(id: number, product: any) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = product;
        }
        return product;
    }

    remove(id: number) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
        return { message: 'Producto eliminado exitosamente.' };
    }
}
