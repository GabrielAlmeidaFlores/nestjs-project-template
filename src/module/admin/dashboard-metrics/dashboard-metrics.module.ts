import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { DashboardMetricsController } from '@module/admin/dashboard-metrics/dashboard-metrics.controller';
import { GetCurrentYearAnalysesCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-analyses-count.use-case';
import { GetCurrentYearPiecesCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-pieces-count.use-case';
import { GetCurrentYearRevenueUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-revenue.use-case';
import { GetCurrentYearUsersCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-users-count.use-case';
import { GetPlanSalesCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-plan-sales-count.use-case';
import { GetTotalSubscribersCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-total-subscribers-count.use-case';
import { ListAllUsersUseCase } from '@module/admin/dashboard-metrics/use-case/list-all-users.use-case';
import { ListCurrentYearAnalysesUseCase } from '@module/admin/dashboard-metrics/use-case/list-current-year-analyses.use-case';
import { ListCurrentYearPiecesUseCase } from '@module/admin/dashboard-metrics/use-case/list-current-year-pieces.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [DashboardMetricsController],
  providers: [
    GetTotalSubscribersCountUseCase,
    GetCurrentYearRevenueUseCase,
    GetCurrentYearUsersCountUseCase,
    GetPlanSalesCountUseCase,
    GetCurrentYearPiecesCountUseCase,
    ListCurrentYearPiecesUseCase,
    GetCurrentYearAnalysesCountUseCase,
    ListCurrentYearAnalysesUseCase,
    ListAllUsersUseCase,
  ],
})
export class DashboardMetricsModule {
  protected readonly _type = DashboardMetricsModule.name;
}
