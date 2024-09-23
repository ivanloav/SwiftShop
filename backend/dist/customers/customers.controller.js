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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const swagger_1 = require("@nestjs/swagger");
const create_customer_dto_1 = require("./create-customer.dto");
const update_customer_dto_1 = require("./update-customer.dto");
let CustomersController = class CustomersController {
    constructor(customersService) {
        this.customersService = customersService;
    }
    findAll() {
        return this.customersService.findAll();
    }
    findOne(id) {
        return this.customersService.findOne(id);
    }
    create(createCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }
    update(id, updateCustomerDto) {
        return this.customersService.update(id, updateCustomerDto);
    }
    remove(id) {
        return this.customersService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID del cliente' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: create_customer_dto_1.CreateCustomerDto }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID del cliente' }),
    (0, swagger_1.ApiBody)({ type: update_customer_dto_1.UpdateCustomerDto }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID del cliente' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "remove", null);
CustomersController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
exports.CustomersController = CustomersController;
//# sourceMappingURL=customers.controller.js.map