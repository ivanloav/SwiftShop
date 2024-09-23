
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
    private readonly inventories: any[];

    constructor() {
        this.inventories = [
            {
                id: 1,
                product: 'Producto 1',
                quantity: 10,
                store: 'Tienda 1'
            },
            {
                id: 2,
                product: 'Producto 2',
                quantity: 20,
                store: 'Tienda 2'
            },
            {
                id: 3,
                product: 'Producto 3',
                quantity: 30,
                store: 'Tienda 3'
            },
        ];
    }

    findAll() {
        return this.inventories;
    }

    findOne(id: number) {
        return this.inventories.find(inventory => inventory.id === id);
    }

    create(inventory: any) {
        this.inventories.push(inventory);
        return inventory;
    }   

    update(id: number, inventory: any) {
        const index = this.inventories.findIndex(i => i.id === id);
        if (index !== -1) {
            this.inventories[index] = inventory;
        }
        return inventory;
    }

    remove(id: number) {
        const index = this.inventories.findIndex(i => i.id === id);
        if (index !== -1) {
            this.inventories.splice(index, 1);
        }
        return { message: 'Inventario eliminado exitosamente.' };
    }
}
