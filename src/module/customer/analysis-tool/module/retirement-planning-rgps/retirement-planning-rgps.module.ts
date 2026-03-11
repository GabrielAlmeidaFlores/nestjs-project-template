import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RetirementPlanningRgpsController } from '@module/customer/analysis-tool/module/retirement-planning-rgps/retirement-planning-rgps.controller';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-public-service.use-case';
import { AnalyzeRetirementPlanningRgpsPppUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-retirement-planning-rgps-ppp.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-work-abroad.use-case';
import { CompareRetirementPlanningRgpsCnisCtpsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/compare-retirement-planning-rgps-cnis-ctps.use-case';
import { ConvertRetirementPlanningRgpsSpecialPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/convert-retirement-planning-rgps-special-period.use-case';
import { CreateMultipleRetirementPlanningRgpsPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-multiple-retirement-planning-rgps-periods.use-case';
import { CreateRetirementPlanningRgpsCnisUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-cnis.use-case';
import { CreateRetirementPlanningRgpsPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-period-document.use-case';
import { CreateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-period.use-case';
import { CreateRetirementPlanningRgpsResultUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-result.use-case';
import { CreateRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-time-accelerator.use-case';
import { CreateRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps.use-case';
import { DeleteRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/delete-retirement-planning-rgps-time-accelerator.use-case';
import { GetRetirementPlanningRgpsDetailsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-details.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-period-earnings-below-minimum.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-period-earnings-overdue.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-period-earnings-without-leave-date.use-case';
import { GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-time-accelerator-from-analysis.use-case';
import { GetRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps.use-case';
import { ListRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/list-retirement-planning-rgps-period.use-case';
import { ListRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/list-retirement-planning-rgps-time-accelerator.use-case';
import { PeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/period-consideration-action.use-case';
import { PeriodLeaveDateActionUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/period-leave-date-action.use-case';
import { UpdateRetirementPlanningRgpsClientUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/update-retirement-planning-rgps-client.use-case';
import { UpdateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/update-retirement-planning-rgps-period.use-case';
import { UpdateRetirementPlanningRgpsResultUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/update-retirement-planning-rgps-result.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    GenerativeIaModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
    MarkdownConverterModule,
  ],
  controllers: [RetirementPlanningRgpsController],
  providers: [
    AnalyzeRetirementPlanningRgpsPppUseCase,
    CompareRetirementPlanningRgpsCnisCtpsUseCase,
    ConvertRetirementPlanningRgpsSpecialPeriodUseCase,
    CreateMultipleRetirementPlanningRgpsPeriodsUseCase,
    CreateRetirementPlanningRgpsCnisUseCase,
    CreateRetirementPlanningRgpsPeriodDocumentUseCase,
    CreateRetirementPlanningRgpsPeriodUseCase,
    CreateRetirementPlanningRgpsResultUseCase,
    CreateRetirementPlanningRgpsTimeAcceleratorUseCase,
    CreateRetirementPlanningRgpsUseCase,
    DeleteRetirementPlanningRgpsTimeAcceleratorUseCase,
    GetRetirementPlanningRgpsDetailsUseCase,
    GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase,
    GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase,
    GetRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase,
    GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase,
    GetRetirementPlanningRgpsUseCase,
    ListRetirementPlanningRgpsPeriodUseCase,
    ListRetirementPlanningRgpsTimeAcceleratorUseCase,
    UpdateRetirementPlanningRgpsClientUseCase,
    UpdateRetirementPlanningRgpsPeriodUseCase,
    UpdateRetirementPlanningRgpsResultUseCase,
    AnalyzeApprenticeStudentUseCase,
    AnalyzeCtpsOutsideCnisUseCase,
    AnalyzeInformalWorkUseCase,
    AnalyzeLaborCourtDecisionUseCase,
    AnalyzeMilitaryServiceUseCase,
    AnalyzePublicServiceUseCase,
    AnalyzeRuralTimeUseCase,
    AnalyzeWorkAbroadUseCase,
    PeriodConsiderationActionUseCase,
    PeriodLeaveDateActionUseCase,
  ],
})
export class RetirementPlanningRgpsModule {
  protected readonly _type = RetirementPlanningRgpsModule.name;
}
