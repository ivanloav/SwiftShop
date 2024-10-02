import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateOrderDto {
  @ApiPropertyOptional({ description: "ID del cliente que realiza el pedido" })
  readonly customerId?: number;

  @ApiPropertyOptional({ description: "ID del producto pedido" })
  readonly productId?: number;

  @ApiPropertyOptional({ description: "Cantidad de productos pedidos" })
  readonly quantity?: number;

  @ApiPropertyOptional({ description: "Total del pedido en euros" })
  readonly total?: number;

  @ApiPropertyOptional({ description: "Estado del pedido" })
  readonly status?: string;
}
