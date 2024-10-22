import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    // Aquí llamamos al servicio de login, que ahora generará y devolverá el token JWT
    const result = await this.authService.login(loginDto);

    // Verificamos si el login fue exitoso y, en caso positivo, devolvemos el token
    if (result.success) {
      return {
        success: true,
        message: "Login exitoso",
        accessToken: result.accessToken, // Incluimos el token JWT en la respuesta
        user: result.user,
      };
    } else {
      return {
        message: result.message,
        success: false,
      };
    }
  }
}
