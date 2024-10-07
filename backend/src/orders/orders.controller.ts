import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "../auth/dto/create-order.dto";
import { UpdateOrderDto } from "../auth/dto/update-order.dto";
import { UpdateOrderStatusDto } from "../auth/dto/update-order-status.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@ApiTags("Pedidos")
@UseGuards(JwtAuthGuard)
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiParam({ name: "id", required: true, description: "ID del pedido" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.ordersService.findOne(id);
  }

  @ApiBody({ type: CreateOrderDto })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiParam({ name: "id", required: true, description: "ID del pedido" })
  @ApiBody({ type: UpdateOrderDto })
  @Put(":id")
  update(@Param("id") id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @ApiParam({ name: "id", required: true, description: "ID del pedido" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.ordersService.remove(id);
  }

  // Nuevo método para actualizar el estado del pedido
  @ApiParam({ name: "id", required: true, description: "ID del pedido" })
  @ApiBody({ type: UpdateOrderStatusDto })
  @Put(":id/status")
  updateStatus(
    @Param("id") id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }
}
