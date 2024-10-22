import { Repository } from "typeorm";
import { Customer } from "../entities/customer.entity";
import { CreateCustomerDto } from "src/auth/dto/create-customer.dto";
import { UpdateCustomerDto } from "src/auth/dto/update-customer.dto";
export declare class CustomersService {
    private readonly customersRepository;
    constructor(customersRepository: Repository<Customer>);
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    remove(id: number): Promise<void>;
}
//# sourceMappingURL=customers.service.d.ts.map