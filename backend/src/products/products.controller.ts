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
import { ProductsService } from "./products.service";
import { ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
import { UpdateProductDto } from "./update-product.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("Products")
@Controller("products")
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiParam({ name: "id", required: true, description: "ID del producto" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.productsService.findOne(id);
  }

  @ApiBody({ type: CreateProductDto })
  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @ApiParam({ name: "id", required: true, description: "ID del producto" })
  @ApiBody({ type: UpdateProductDto })
  @Put(":id")
  update(@Param("id") id: number, @Body() product: UpdateProductDto) {
    return this.productsService.update(id, product);
  }

  @ApiParam({ name: "id", required: true, description: "ID del producto" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.productsService.remove(id);
  }
}
