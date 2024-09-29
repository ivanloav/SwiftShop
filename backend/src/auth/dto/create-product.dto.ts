import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ description: "Nombre del producto" })
  readonly name: string;

  @ApiProperty({ description: "Descripción del producto" })
  readonly description: string;

  @ApiProperty({ description: "Precio del producto" })
  readonly price: number;

  @ApiProperty({ description: "Cantidad en stock" })
  readonly stock: number;

  @ApiProperty({ description: "Categoría del producto" })
  readonly category: string;

  @ApiProperty({ description: "Imagen del producto" })
  readonly image: string;

  @ApiProperty({
    description: "ID de la tienda a la que pertenece el producto",
  })
  readonly storeId: number;
}
