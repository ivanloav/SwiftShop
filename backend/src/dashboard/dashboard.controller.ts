import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DashboardService } from "./dashboard.service";

@UseGuards(JwtAuthGuard) // Protege las rutas del dashboard con el guard JWT
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboardData() {
    // Aquí es donde obtienes los datos del dashboard
    return { message: "Datos protegidos del dashboard" };
  }

  @Get("top-products")
  async getTopProducts() {
    return this.dashboardService.getTopProducts();
  }

  @Get("sales-data")
  async getSalesData() {
    return this.dashboardService.getSalesData();
  }
}
