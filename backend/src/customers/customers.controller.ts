import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { CreateCustomerDto } from "../auth/dto/create-customer.dto";
import { UpdateCustomerDto } from "../auth/dto/update-customer.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Clientes")
@UseGuards(JwtAuthGuard)
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiParam({ name: "id", required: true, description: "ID del cliente" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.customersService.findOne(id);
  }

  @ApiBody({ type: CreateCustomerDto })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiParam({ name: "id", required: true, description: "ID del cliente" })
  @ApiBody({ type: UpdateCustomerDto })
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @ApiParam({ name: "id", required: true, description: "ID del cliente" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.customersService.remove(id);
  }
}
