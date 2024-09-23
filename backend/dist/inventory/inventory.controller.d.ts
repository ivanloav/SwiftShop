import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAll(): any[];
    update(id: number, updateInventoryDto: UpdateInventoryDto): any;
}
//# sourceMappingURL=inventory.controller.d.ts.map