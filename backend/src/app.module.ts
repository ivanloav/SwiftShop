
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ProductsModule,
    InventoryModule,
    CustomersModule,
    OrdersModule,
    StoresModule
  ],
})
export class AppModule {}
