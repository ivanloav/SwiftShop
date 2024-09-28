import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { email, password, name } = registerDto;
    const existingUser = await this.usersService.findUserByEmail(email);

    if (existingUser) {
      return { success: false, message: "El usuario ya existe" };
    }

    const newUser = await this.usersService.createUser(email, password, name);
    return {
      success: true,
      message: "Usuario registrado exitosamente",
      user: newUser,
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Contraseña incorrecta" };
    }

    // Genera el token JWT
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { success: true, user, accessToken };
  }
}
