
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  name: string;

  @ApiProperty({ description: 'Correo electrónico del cliente' })
  email: string;

  @ApiProperty({ description: 'Dirección del cliente' })
  address: string;
}
