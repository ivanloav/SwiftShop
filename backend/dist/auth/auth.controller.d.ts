import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        accessToken: any;
        user: any;
        success?: undefined;
    } | {
        message: any;
        success: boolean;
        accessToken?: undefined;
        user?: undefined;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map