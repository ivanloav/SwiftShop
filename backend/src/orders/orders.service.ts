
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    private readonly orders: any[];

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

    findOne(id: number) {
        return this.orders.find(order => order.id === id);
    }

    create(order: any) {
        this.orders.push(order);
        return order;
    }

    update(id: number, order: any) {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders[index] = order;
        }
        return order;
    }

    remove(id: number) {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
        }
        return { message: 'Orden eliminada exitosamente.' };
    }
}
