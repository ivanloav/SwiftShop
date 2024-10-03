import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../entities/customer.entity";
import { CreateCustomerDto } from "src/auth/dto/create-customer.dto";
import { UpdateCustomerDto } from "src/auth/dto/update-customer.dto";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find({ relations: ["orders"] });
  }

  findOne(id: number): Promise<Customer> {
    return this.customersRepository.findOne({
      where: { customerId: id },
      relations: ["orders"],
    });
  }

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(newCustomer);
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    await this.customersRepository.update(id, updateCustomerDto);
    return this.customersRepository.findOneBy({ customerId: id });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
