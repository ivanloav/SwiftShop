import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({ description: "ID del cliente que realiza el pedido" })
  readonly customerId: number;

  @ApiProperty({ description: "ID del producto pedido" })
  readonly productId: number;

  @ApiProperty({ description: "Cantidad de productos pedidos" })
  readonly quantity: number;

  @ApiProperty({ description: "Total del pedido en euros" })
  readonly total: number;

  @ApiProperty({ description: "Estado del pedido" })
  readonly status: string;
}
