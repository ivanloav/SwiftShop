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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
let OrdersService = class OrdersService {
    constructor() {
        this.orders = [
            {
                id: 1,
                storeId: 1,
                products: [
                    { id: 1, name: 'Producto 1', price: 100, quantity: 1 },
                    { id: 2, name: 'Producto 2', price: 200, quantity: 2 }
                ],
                total: 500
            },
            {
                id: 2,
                storeId: 2,
                products: [
                    { id: 3, name: 'Producto 3', price: 300, quantity: 3 },
                    { id: 4, name: 'Producto 4', price: 400, quantity: 4 }
                ],
                total: 2000
            },
            {
                id: 3,
                storeId: 3,
                products: [
                    { id: 5, name: 'Producto 5', price: 500, quantity: 5 },
                    { id: 6, name: 'Producto 6', price: 600, quantity: 6 }
                ],
                total: 5500
            },
        ];
    }
    findAll() {
        return this.orders;
    }
    findOne(id) {
        return this.orders.find(order => order.id === id);
    }
    create(order) {
        this.orders.push(order);
        return order;
    }
    update(id, order) {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders[index] = order;
        }
        return order;
    }
    remove(id) {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
        }
        return { message: 'Orden eliminada exitosamente.' };
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map