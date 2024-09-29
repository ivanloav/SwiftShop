import { ApiProperty } from "@nestjs/swagger";

export class UpdateInventoryDto {
  @ApiProperty({ description: "ID del producto en inventario" })
  readonly productId: number;

  @ApiProperty({
    description: "Cantidad actualizada del producto en inventario",
  })
  readonly quantity: number;
}
