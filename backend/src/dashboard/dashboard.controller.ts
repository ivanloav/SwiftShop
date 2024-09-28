import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard) // Protege las rutas del dashboard con el guard JWT
@Controller("dashboard")
export class DashboardController {
  @Get()
  getDashboardData() {
    // Aquí es donde obtienes los datos del dashboard
    return { message: "Datos protegidos del dashboard" };
  }
}
