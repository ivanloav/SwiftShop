import { StoresService } from './stores.service';
import { CreateStoreDto } from './create-store.dto';
import { UpdateStoreDto } from './update-store.dto';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    findAll(): any[];
    findOne(id: number): any;
    create(createStoreDto: CreateStoreDto): any;
    update(id: number, updateStoreDto: UpdateStoreDto): any;
    remove(id: number): {
        message: string;
    };
}
//# sourceMappingURL=stores.controller.d.ts.map