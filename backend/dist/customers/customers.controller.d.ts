import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./create-customer.dto";
import { UpdateCustomerDto } from "./update-customer.dto";
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(): any[];
    findOne(id: number): any;
    create(createCustomerDto: CreateCustomerDto): any;
    update(id: number, updateCustomerDto: UpdateCustomerDto): any;
    remove(id: number): {
        message: string;
    };
}
//# sourceMappingURL=customers.controller.d.ts.map