import { Controller, Get, Put, Param, Body } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { UpdateInventoryDto } from "./update-inventory.dto"; // Asegúrate de importar el DTO

@ApiTags("Inventario")
@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @ApiParam({ name: "id", required: true, description: "ID del producto" })
  @ApiBody({ type: UpdateInventoryDto }) // Usa el DTO correcto aquí
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateInventoryDto: UpdateInventoryDto
  ) {
    return this.inventoryService.update(id, updateInventoryDto); // Pasa el DTO correctamente al servicio
  }
}
