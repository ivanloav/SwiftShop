
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiProperty({ description: 'Nombre de la tienda' })
  name: string;

  @ApiProperty({ description: 'ID del propietario' })
  ownerId: number;
}
