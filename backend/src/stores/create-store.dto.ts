
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ description: 'Nombre de la tienda' })
  name: string;

  @ApiProperty({ description: 'ID del propietario' })
  ownerId: number;
}
