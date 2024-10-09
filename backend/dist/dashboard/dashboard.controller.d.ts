import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardData(): {
        message: string;
    };
    getTopProducts(): Promise<import("../entities/product.entity").Product[]>;
}
//# sourceMappingURL=dashboard.controller.d.ts.map