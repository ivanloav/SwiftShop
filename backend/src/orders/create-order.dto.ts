
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID del cliente' })
  customerId: number;

  @ApiProperty({ description: 'Productos del pedido', type: [Object] })
  products: Array<{ productId: number; quantity: number }>;

  @ApiProperty({ description: 'Total del pedido' })
  total: number;
}
