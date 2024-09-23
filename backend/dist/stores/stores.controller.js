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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const stores_service_1 = require("./stores.service");
const swagger_1 = require("@nestjs/swagger");
const create_store_dto_1 = require("./create-store.dto");
const update_store_dto_1 = require("./update-store.dto");
let StoresController = class StoresController {
    constructor(storesService) {
        this.storesService = storesService;
    }
    findAll() {
        return this.storesService.findAll();
    }
    findOne(id) {
        return this.storesService.findOne(id);
    }
    create(createStoreDto) {
        return this.storesService.create(createStoreDto);
    }
    update(id, updateStoreDto) {
        return this.storesService.update(id, updateStoreDto);
    }
    remove(id) {
        return this.storesService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID de la tienda' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: create_store_dto_1.CreateStoreDto }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID de la tienda' }),
    (0, swagger_1.ApiBody)({ type: update_store_dto_1.UpdateStoreDto }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID de la tienda' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "remove", null);
StoresController = __decorate([
    (0, swagger_1.ApiTags)('Tiendas'),
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
exports.StoresController = StoresController;
//# sourceMappingURL=stores.controller.js.map