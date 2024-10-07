import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDecimal, IsInt } from "class-validator";

export class UpdateOrderDto {
  @ApiPropertyOptional({ description: "ID del cliente que realiza el pedido" })
  @IsInt()
  customerId?: number;

  @ApiPropertyOptional({ description: "ID del producto pedido" })
  @IsInt()
  productId?: number;

  @ApiPropertyOptional({ description: "Cantidad de productos pedidos" })
  @IsInt()
  quantity?: number;

  @ApiPropertyOptional({ description: "Total del pedido en euros" })
  @IsDecimal({ decimal_digits: "2", force_decimal: true })
  total?: number;

  @ApiPropertyOptional({ description: "Estado del pedido" })
  status?: string;
}
