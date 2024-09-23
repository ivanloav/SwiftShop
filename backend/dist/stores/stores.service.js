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
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
let StoresService = class StoresService {
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
    findOne(id) {
        return this.stores.find(store => store.id === id);
    }
    create(store) {
        this.stores.push(store);
        return store;
    }
    update(id, store) {
        const index = this.stores.findIndex(s => s.id === id);
        if (index !== -1) {
            this.stores[index] = store;
        }
        return store;
    }
    remove(id) {
        const index = this.stores.findIndex(s => s.id === id);
        if (index !== -1) {
            this.stores.splice(index, 1);
        }
        return { message: 'Tienda eliminada exitosamente.' };
    }
};
StoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StoresService);
exports.StoresService = StoresService;
//# sourceMappingURL=stores.service.js.map