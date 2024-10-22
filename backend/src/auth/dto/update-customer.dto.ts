import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCustomerDto {
  @ApiPropertyOptional({ description: "Nombre del cliente" })
  readonly name?: string;

  @ApiPropertyOptional({ description: "Correo electrónico del cliente" })
  readonly email?: string;

  @ApiPropertyOptional({ description: "Dirección del cliente" })
  readonly address?: string;
}
