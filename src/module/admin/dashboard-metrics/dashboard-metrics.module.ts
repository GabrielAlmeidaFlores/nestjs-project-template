import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { DashboardMetricsController } from '@module/admin/dashboard-metrics/dashboard-metrics.controller';
import { GetCurrentYearAnalysesCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-analyses-count.use-case';
import { GetCurrentYearAnalysisMonthlyCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-analyses-monthly-count.use-case';
import { GetCurrentYearLegalPleadingsCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-legal-pleadings-count.use-case';
import { GetCurrentYearLegalPleadingMonthlyCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-legal-pleadings-monthly-count.use-case';
import { GetCurrentYearRevenueUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-revenue.use-case';
import { GetCurrentYearUsersCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-users-count.use-case';
import { GetCurrentYearUsersMonthlyUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-users-monthly-count.use-case';
import { GetPaymentPlanSalesCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-payment-plan-sales-count.use-case';
import { GetTotalSubscribersCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-total-subscribers-count.use-case';
import { ListAllUsersUseCase } from '@module/admin/dashboard-metrics/use-case/list-all-users.use-case';
import { ListCurrentYearAnalysesUseCase } from '@module/admin/dashboard-metrics/use-case/list-current-year-analyses.use-case';
import { ListCurrentYearLegalPleadingsUseCase } from '@module/admin/dashboard-metrics/use-case/list-current-year-legal-pleadings.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [DashboardMetricsController],
  providers: [
    GetTotalSubscribersCountUseCase,
    GetCurrentYearRevenueUseCase,
    GetCurrentYearUsersCountUseCase,
    GetPaymentPlanSalesCountUseCase,
    GetCurrentYearLegalPleadingsCountUseCase,
    ListCurrentYearLegalPleadingsUseCase,
    GetCurrentYearLegalPleadingMonthlyCountUseCase,
    GetCurrentYearAnalysesCountUseCase,
    ListCurrentYearAnalysesUseCase,
    GetCurrentYearAnalysisMonthlyCountUseCase,
    ListAllUsersUseCase,
    GetCurrentYearUsersMonthlyUseCase,
  ],
})
export class DashboardMetricsModule {
  protected readonly _type = DashboardMetricsModule.name;
}
