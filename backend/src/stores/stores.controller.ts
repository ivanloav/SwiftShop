import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { StoresService } from "./stores.service";
import { ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { CreateStoreDto } from "../auth/dto/create-store.dto";
import { UpdateStoreDto } from "../auth/dto/update-store.dto";

@ApiTags("Tiendas")
@Controller("stores")
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @ApiParam({ name: "id", required: true, description: "ID de la tienda" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.storesService.findOne(id);
  }

  @ApiBody({ type: CreateStoreDto })
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @ApiParam({ name: "id", required: true, description: "ID de la tienda" })
  @ApiBody({ type: UpdateStoreDto })
  @Put(":id")
  update(@Param("id") id: number, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @ApiParam({ name: "id", required: true, description: "ID de la tienda" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.storesService.remove(id);
  }
}
