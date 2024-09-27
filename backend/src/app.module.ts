import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./products/products.module";
import { InventoryModule } from "./inventory/inventory.module";
import { CustomersModule } from "./customers/customers.module";
import { OrdersModule } from "./orders/orders.module";
import { StoresModule } from "./stores/stores.module";
import { AuthModule } from "./auth/auth.module"; // Importar AuthModule
import { UsersModule } from "./users/users.module"; // Importar UsersModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    InventoryModule,
    CustomersModule,
    OrdersModule,
    StoresModule,
    AuthModule, // Agregar AuthModule
    UsersModule, // Agregar UsersModule
  ],
})
export class AppModule {}
