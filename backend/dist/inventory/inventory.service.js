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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
let InventoryService = class InventoryService {
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
    findOne(id) {
        return this.inventories.find(inventory => inventory.id === id);
    }
    create(inventory) {
        this.inventories.push(inventory);
        return inventory;
    }
    update(id, inventory) {
        const index = this.inventories.findIndex(i => i.id === id);
        if (index !== -1) {
            this.inventories[index] = inventory;
        }
        return inventory;
    }
    remove(id) {
        const index = this.inventories.findIndex(i => i.id === id);
        if (index !== -1) {
            this.inventories.splice(index, 1);
        }
        return { message: 'Inventario eliminado exitosamente.' };
    }
};
InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InventoryService);
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map