import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "../auth/dto/create-customer.dto";
import { UpdateCustomerDto } from "../auth/dto/update-customer.dto";
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(): Promise<import("../entities/customer.entity").Customer[]>;
    findOne(id: number): Promise<import("../entities/customer.entity").Customer>;
    create(createCustomerDto: CreateCustomerDto): Promise<import("../entities/customer.entity").Customer>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<import("../entities/customer.entity").Customer>;
    remove(id: number): Promise<void>;
}
//# sourceMappingURL=customers.controller.d.ts.map