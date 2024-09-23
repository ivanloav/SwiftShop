"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let ProductsService = class ProductsService {
    constructor() {
        const filePath = path.join(__dirname, '../mock-data/products.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        this.products = JSON.parse(fileContents);
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        return this.products.find(product => product.id === id);
    }
    create(product) {
        this.products.push(product);
        return product;
    }
    update(id, product) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = product;
        }
        return product;
    }
    remove(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
        return { message: 'Producto eliminado exitosamente.' };
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map