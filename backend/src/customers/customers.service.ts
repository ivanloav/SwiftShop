
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
    private readonly customers: any[];

    constructor() {
        this.customers = [
            {
                id: 1,
                name: 'Cliente 1',
                email: ''
            },
            {
                id: 2,
                name: 'Cliente 2',
                email: ''
            },
            {
                id: 3,
                name: 'Cliente 3',
                email: ''
            },
        ];
    }

    findAll() {
        return this.customers;
    }

    findOne(id: number) {
        return this.customers.find(customer => customer.id === id);
    }

    create(customer: any) {
        this.customers.push(customer);
        return customer;
    }

    update(id: number, customer: any) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers[index] = customer;
        }
        return customer;
    }

    remove(id: number) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers.splice(index, 1);
        }
        return { message: 'Cliente eliminado exitosamente.' };
    }
}
