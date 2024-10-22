import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardData(): {
        message: string;
    };
    getTopProducts(): Promise<import("../entities/product.entity").Product[]>;
    getSalesData(): Promise<{
        date: any;
        sales: number;
    }[]>;
}
//# sourceMappingURL=dashboard.controller.d.ts.map