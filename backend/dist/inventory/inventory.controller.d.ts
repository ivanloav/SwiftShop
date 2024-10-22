import { InventoryService } from "./inventory.service";
import { UpdateInventoryDto } from "../auth/dto/update-inventory.dto";
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAll(): Promise<import("../entities/product.entity").Product[]>;
    update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<import("../entities/product.entity").Product>;
}
//# sourceMappingURL=inventory.controller.d.ts.map