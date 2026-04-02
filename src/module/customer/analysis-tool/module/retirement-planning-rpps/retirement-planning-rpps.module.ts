import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { RetirementPlanningRppsController } from '@module/customer/analysis-tool/module/retirement-planning-rpps/retirement-planning-rpps.controller';
import { CreateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/create-retirement-planning-rpps-remuneration.use-case';
import { CreateRetirementPlanningRppsResultUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/create-retirement-planning-rpps-result.use-case';
import { CreateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/create-retirement-planning-rpps.use-case';
import { DeleteRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/delete-retirement-planning-rpps.use-case';
import { GetRetirementPlanningRppsRemunerationCalculationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/get-retirement-planning-rpps-remuneration-calculation.use-case';
import { GetRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/get-retirement-planning-rpps.use-case';
import { ListRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/list-retirement-planning-rpps-remuneration.use-case';
import { UpdateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/update-retirement-planning-rpps-remuneration.use-case';
import { UpdateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/update-retirement-planning-rpps.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
    DatabaseModule,
    AnalysisProcessorModule,
    AnalysisActivityTrackerModule,
    FileProcessorModule,
    RemunerationCalculatorModule,
    OrganizationCreditModule,
    OrganizationSessionModule,
    PaymentPlanModule,
  ],
  controllers: [RetirementPlanningRppsController],
  providers: [
    CreateRetirementPlanningRppsUseCase,
    CreateRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsRemunerationUseCase,
    GetRetirementPlanningRppsUseCase,
    GetRetirementPlanningRppsRemunerationCalculationUseCase,
    ListRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsUseCase,
    CreateRetirementPlanningRppsResultUseCase,
    DeleteRetirementPlanningRppsUseCase,
  ],
  exports: [DeleteRetirementPlanningRppsUseCase],
})
export class RetirementPlanningRppsModule {
  protected readonly _type = RetirementPlanningRppsModule.name;
}
