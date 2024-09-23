import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  name: string;

  @ApiProperty({ description: 'Descripción del producto' })
  description: string;

  @ApiProperty({ description: 'Precio del producto' })
  price: number;

  @ApiProperty({ description: 'Cantidad en stock' })
  stock: number;

  @ApiProperty({ description: 'Categoría del producto' })
  category: string;
}
