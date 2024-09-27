import { InventoryService } from "./inventory.service";
import { UpdateInventoryDto } from "./update-inventory.dto";
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAll(): Promise<import("../products/product.entity").Product[]>;
    update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<import("../products/product.entity").Product>;
}
//# sourceMappingURL=inventory.controller.d.ts.map