import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProductDto {
  @ApiPropertyOptional({ description: "Nombre del producto" })
  readonly name?: string;

  @ApiPropertyOptional({ description: "Descripción del producto" })
  readonly description?: string;

  @ApiPropertyOptional({ description: "Precio del producto" })
  readonly price?: number;

  @ApiPropertyOptional({ description: "Cantidad en stock del producto" })
  readonly stock?: number;

  @ApiPropertyOptional({ description: "Categoría del producto" })
  readonly category?: string;

  @ApiPropertyOptional({ description: "Imagen del producto" })
  readonly image?: string;

  @ApiPropertyOptional({
    description: "ID de la tienda a la que pertenece el producto",
  })
  readonly storeId?: number;
}
