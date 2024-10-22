import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(email: string, password: string, name: string): Promise<User>;
    findUserByEmail(email: string): Promise<User | undefined>;
}
//# sourceMappingURL=users.service.d.ts.map