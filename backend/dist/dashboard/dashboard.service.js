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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
const order_entity_1 = require("../entities/order.entity");
let DashboardService = class DashboardService {
    constructor(productRepository, orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }
    async getTopProducts() {
        return this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.orders", "order")
            .select([
            "product.productId",
            "product.name",
            "product.price",
            "product.image",
        ])
            .addSelect("SUM(order.quantity)", "totalQuantity")
            .groupBy("product.productId")
            .orderBy("totalQuantity", "DESC")
            .limit(4)
            .getRawMany();
    }
    async getSalesData() {
        const salesData = await this.orderRepository
            .createQueryBuilder("order")
            .select("DATE(order.created_at)", "date")
            .addSelect("SUM(order.total)", "sales")
            .groupBy("DATE(order.created_at)")
            .orderBy("DATE(order.created_at)", "ASC")
            .getRawMany();
        return salesData.map((entry) => ({
            date: entry.date,
            sales: parseFloat(entry.sales),
        }));
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map