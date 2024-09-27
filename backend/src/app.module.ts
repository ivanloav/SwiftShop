import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./products/products.module";
import { InventoryModule } from "./inventory/inventory.module";
import { CustomersModule } from "./customers/customers.module";
import { OrdersModule } from "./orders/orders.module";
import { StoresModule } from "./stores/stores.module";

@Module({
  imports: [
    // ConfigModule para cargar las variables de entorno desde el archivo .env
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la aplicación
    }),

    // Configura TypeORM para MySQL usando variables de entorno
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST, // Usar variable de entorno
      port: parseInt(process.env.DB_PORT, 10) || 3306, // Usar puerto de entorno o 3306 por defecto
      username: process.env.DB_USER, // Usuario de la DB
      password: process.env.DB_PASSWORD, // Contraseña de la DB
      database: process.env.DB_NAME, // Nombre de la base de datos
      autoLoadEntities: true, // Carga automáticamente las entidades registradas
      synchronize: true, // Solo en desarrollo, sincroniza las entidades con la base de datos
    }),

    // Importar los demás módulos que tienen las entidades y servicios
    ProductsModule, // Modulo de productos
    InventoryModule, // Modulo de inventario
    CustomersModule, // Modulo de clientes
    OrdersModule, // Modulo de ordenes
    StoresModule, // Modulo de tiendas
  ],
})
export class AppModule {}
