import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config"; // Importa ConfigModule para cargar variables de entorno
import { ProductsModule } from "./products/products.module";
import { InventoryModule } from "./inventory/inventory.module";
import { CustomersModule } from "./customers/customers.module";
import { OrdersModule } from "./orders/orders.module";
import { StoresModule } from "./stores/stores.module";

@Module({
  imports: [
    // ConfigModule para cargar las variables de entorno desde .env o docker-compose
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la aplicación
    }),

    // Configura TypeORM para MySQL usando variables de entorno
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Carga automáticamente las entidades
      synchronize: true, // Sincroniza las entidades con la base de datos (solo en desarrollo)
    }),

    // Los demás módulos de tu aplicación
    ProductsModule,
    InventoryModule,
    CustomersModule,
    OrdersModule,
    StoresModule,
  ],
})
export class AppModule {}
