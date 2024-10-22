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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateOrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID del cliente que realiza el pedido" }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID del producto pedido" }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Cantidad de productos pedidos" }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total del pedido en euros" }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estado del pedido" }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map