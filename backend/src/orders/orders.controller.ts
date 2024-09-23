
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderDto } from './update-order.dto';

@ApiTags('Pedidos')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiParam({ name: 'id', required: true, description: 'ID del pedido' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @ApiBody({ type: CreateOrderDto })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiParam({ name: 'id', required: true, description: 'ID del pedido' })
  @ApiBody({ type: UpdateOrderDto })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @ApiParam({ name: 'id', required: true, description: 'ID del pedido' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
