import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderStatusDto {
  @ApiProperty({ example: "shipped", description: "Nuevo estado del pedido" })
  status: string;
}
