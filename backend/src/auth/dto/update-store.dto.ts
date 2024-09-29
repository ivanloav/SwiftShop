import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateStoreDto {
  @ApiPropertyOptional({ description: "Nombre de la tienda" })
  readonly name?: string;

  @ApiPropertyOptional({ description: "Propietario de la tienda" })
  readonly owner?: string;
}
