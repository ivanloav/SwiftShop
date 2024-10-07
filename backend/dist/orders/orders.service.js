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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const customer_entity_1 = require("../entities/customer.entity");
const product_entity_1 = require("../entities/product.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepository, customerRepository, productRepository) {
        this.ordersRepository = ordersRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }
    findAll() {
        return this.ordersRepository.find({
            relations: ["customer", "product"],
        });
    }
    findOne(id) {
        return this.ordersRepository.findOne({
            where: { orderId: id },
            relations: ["customer", "product"],
        });
    }
    async create(createOrderDto) {
        const newOrder = this.ordersRepository.create(Object.assign(Object.assign({}, createOrderDto), { customer: { customerId: createOrderDto.customerId }, product: { productId: createOrderDto.productId } }));
        return this.ordersRepository.save(newOrder);
    }
    async update(id, updateOrderDto) {
        const { customerId, productId } = updateOrderDto, updateData = __rest(updateOrderDto, ["customerId", "productId"]);
        const order = await this.ordersRepository.findOne({
            where: { orderId: id },
            relations: ["customer", "product"],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (customerId) {
            const customer = await this.customerRepository.findOne({
                where: { customerId: customerId },
            });
            if (!customer) {
                throw new common_1.NotFoundException(`Customer with ID ${customerId} not found`);
            }
            order.customer = customer;
        }
        if (productId) {
            const product = await this.productRepository.findOne({
                where: { productId: productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
            }
            order.product = product;
        }
        Object.assign(order, updateData);
        return this.ordersRepository.save(order);
    }
    async remove(id) {
        const result = await this.ordersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
    }
    async updateStatus(id, updateOrderStatusDto) {
        const order = await this.ordersRepository.findOne({
            where: { orderId: id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Pedido con ID ${id} no encontrado`);
        }
        order.status = updateOrderStatusDto.status;
        return this.ordersRepository.save(order);
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map