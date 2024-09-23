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
exports.UpdateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateOrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del cliente' }),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Productos del pedido', type: [Object] }),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total del pedido' }),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "total", void 0);
exports.UpdateOrderDto = UpdateOrderDto;
//# sourceMappingURL=update-order.dto.js.map