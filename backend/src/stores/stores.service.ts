
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresService {
    private readonly stores: any[];

    constructor() {
        this.stores = [
            {
                id: 1,
                name: 'Tienda 1',
                address: 'Calle 1, 1234',
                phone: '1234-5678',
                email: ''
            },
            {
                id: 2,
                name: 'Tienda 2',
                address: 'Calle 2, 1234',
                phone: '1234-5678',
                email: ''
            },
            {
                id: 3,
                name: 'Tienda 3',
                address: 'Calle 3, 1234',
                phone: '1234-5678',
                email: ''
            },
        ];
    }

    findAll() {
        return this.stores;
    }

    findOne(id: number) {
        return this.stores.find(store => store.id === id);
    }

    create(store: any) {
        this.stores.push(store);
        return store;
    }

    update(id: number, store: any) {
        const index = this.stores.findIndex(s => s.id === id);
        if (index !== -1) {
            this.stores[index] = store;
        }
        return store;
    }

    remove(id: number) {
        const index = this.stores.findIndex(s => s.id === id);
        if (index !== -1) {
            this.stores.splice(index, 1);
        }
        return { message: 'Tienda eliminada exitosamente.' };
    }
}
