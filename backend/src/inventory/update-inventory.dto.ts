
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiProperty({ description: 'ID del producto' })
  productId: number;

  @ApiProperty({ description: 'Cantidad en inventario' })
  quantity: number;
}
