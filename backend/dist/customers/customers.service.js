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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
let CustomersService = class CustomersService {
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
    findOne(id) {
        return this.customers.find(customer => customer.id === id);
    }
    create(customer) {
        this.customers.push(customer);
        return customer;
    }
    update(id, customer) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers[index] = customer;
        }
        return customer;
    }
    remove(id) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers.splice(index, 1);
        }
        return { message: 'Cliente eliminado exitosamente.' };
    }
};
CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CustomersService);
exports.CustomersService = CustomersService;
//# sourceMappingURL=customers.service.js.map