import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
  @ApiProperty({ description: "Nombre de la tienda" })
  readonly name: string;

  @ApiProperty({ description: "Propietario de la tienda" })
  readonly owner: string;
}
