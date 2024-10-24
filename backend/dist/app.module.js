"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const products_module_1 = require("./products/products.module");
const inventory_module_1 = require("./inventory/inventory.module");
const customers_module_1 = require("./customers/customers.module");
const orders_module_1 = require("./orders/orders.module");
const stores_module_1 = require("./stores/stores.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const dotenv = require("dotenv");
const dashboard_module_1 = require("./dashboard/dashboard.module");
dotenv.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: "../.env",
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10) || 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                autoLoadEntities: true,
                synchronize: false,
            }),
            products_module_1.ProductsModule,
            inventory_module_1.InventoryModule,
            customers_module_1.CustomersModule,
            orders_module_1.OrdersModule,
            stores_module_1.StoresModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            dashboard_module_1.DashboardModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map