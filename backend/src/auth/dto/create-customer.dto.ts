import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
  @ApiProperty({ description: "Nombre del cliente" })
  readonly name: string;

  @ApiProperty({ description: "Correo electrónico del cliente" })
  readonly email: string;

  @ApiProperty({ description: "Dirección del cliente" })
  readonly address: string;
}
