import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisToolController } from '@module/customer/analysis-tool/analysis-tool.controller';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { GetAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/list-analysis-tool-client-legal-proceeding.use-case-gateway';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/use-case/analyze-public-service.use-case';
import { AnalyzeRetirementPlanningRgpsPppUseCase } from '@module/customer/analysis-tool/use-case/analyze-retirement-planning-rgps-ppp.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/use-case/analyze-work-abroad.use-case';
import { CompareRetirementPlanningRgpsCnisCtpsUseCase } from '@module/customer/analysis-tool/use-case/compare-retirement-planning-rgps-cnis-ctps.use-case';
import { ConvertRetirementPlanningRgpsSpecialPeriodUseCase } from '@module/customer/analysis-tool/use-case/convert-retirement-planning-rgps-special-period.use-case';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading.use-case';
import { CreateMultipleRetirementPlanningRgpsPeriodsUseCase } from '@module/customer/analysis-tool/use-case/create-multiple-retirement-planning-rgps-periods.use-case';
import { CreateRetirementPlanningRgpsCnisUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-cnis.use-case';
import { CreateRetirementPlanningRgpsPeriodDocumentUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-period-document.use-case';
import { CreateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-period.use-case';
import { CreateRetirementPlanningRgpsResultUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-result.use-case';
import { CreateRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-time-accelerator.use-case';
import { CreateRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps.use-case';
import { CreateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps-remuneration.use-case';
import { CreateRetirementPlanningRppsResultUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps-result.use-case';
import { CreateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { DeleteRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/delete-retirement-planning-rgps-time-accelerator.use-case';
import { DeleteRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/delete-retirement-planning-rpps.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase, DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetAnalysisToolClientLegalProceedingUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client-legal-proceeding.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetAnalysisToolRecordStatisticsUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-record-statistics.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { GetLegalPleadingStatisticsUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading-statistics.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading.use-case';
import { GetRetirementPlanningRgpsDetailsUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps-details.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps-period-earnings-below-minimum.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps-period-earnings-overdue.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps-period-earnings-without-leave-date.use-case';
import { GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps-time-accelerator-from-analysis.use-case';
import { GetRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps.use-case';
import { GetRetirementPlanningRppsRemunerationCalculationUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rpps-remuneration-calculation.use-case';
import { GetRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rpps.use-case';
import { ListAnalysisToolClientLegalProceedingUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client-legal-proceeding.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListCidTenUseCase } from '@module/customer/analysis-tool/use-case/list-cid-ten.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/list-legal-pleading.use-case';
import { ListRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/use-case/list-retirement-planning-rgps-period.use-case';
import { ListRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/list-retirement-planning-rgps-time-accelerator.use-case';
import { ListRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/list-retirement-planning-rpps-remuneration.use-case';
import { PeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/use-case/period-consideration-action.use-case';
import { PeriodLeaveDateActionUseCase } from '@module/customer/analysis-tool/use-case/period-leave-date-action.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-complete-analysis.use-case';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-status-to-complete.use-case';
import { UpdateRetirementPlanningRgpsClientUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rgps-client.use-case';
import { UpdateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rgps-period.use-case';
import { UpdateRetirementPlanningRgpsResultUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rgps-result.use-case';
import { UpdateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rpps-remuneration.use-case';
import { UpdateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rpps.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';
@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    RemunerationCalculatorModule,
    CnisAnalyzerModule,
    GenerativeIaModule,
  ],
  controllers: [AnalysisToolController],
  providers: [
    CreateRetirementPlanningRgpsResultUseCase,
    CreateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    ListAnalysisToolClientUseCase,
    CreateAnalysisToolClientUseCase,
    DeleteCnisFastAnalysisUseCase,
    DeleteAnalysisToolClientUseCase,
    CreateLegalPleadingUseCase,
    DownloadCnisCompleteAnalysisUseCase,
    DownloadCnisSimplifiedAnalysisUseCase,
    CreateLegalPleadingResultUseCase,
    ListAnalysisToolRecordUseCase,
    GetLegalPleadingUseCase,
    GetAnalysisToolRecordStatisticsUseCase,
    GetLegalPleadingStatisticsUseCase,
    ListLegalPleadingUseCase,
    CreateLegalPleadingDocumentAnalysisUseCase,
    DownloadLegalPleadingSimplifiedAnalysisUseCase,
    DownloadLegalPleadingCompleteAnalysisUseCase,
    UpdateLegalPleadingCompleteAnalysisUseCase,
    UpdateLegalPleadingStatusToCompleteUseCase,
    UpdateAnalysisToolClientUseCase,
    DeleteAnalysisToolRecordUseCase,
    DeleteLegalPleadingUseCase,
    DeleteRetirementPlanningRppsUseCase,
    GetAnalysisToolClientUseCase,
    UpdateCnisFastAnalysisUseCase,
    GetAnalysisToolClientLegalProceedingUseCase,
    CreateRetirementPlanningRppsUseCase,
    CreateRetirementPlanningRppsRemunerationUseCase,
    CreateRetirementPlanningRppsResultUseCase,
    GetRetirementPlanningRppsUseCase,
    GetRetirementPlanningRppsRemunerationCalculationUseCase,
    ListRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsUseCase,
    ListCidTenUseCase,
    {
      provide: ListAnalysisToolClientLegalProceedingUseCaseGateway,
      useClass: ListAnalysisToolClientLegalProceedingUseCase,
    },
    {
      provide: GetAnalysisToolClientLegalProceedingUseCaseGateway,
      useClass: GetAnalysisToolClientLegalProceedingUseCase,
    },

        UpdateRetirementPlanningRgpsResultUseCase,
    UpdateRetirementPlanningRgpsClientUseCase,
    CreateRetirementPlanningRgpsUseCase,
    CreateRetirementPlanningRgpsCnisUseCase,
    CreateRetirementPlanningRgpsPeriodUseCase,
    UpdateRetirementPlanningRgpsPeriodUseCase,
    CreateRetirementPlanningRgpsPeriodDocumentUseCase,
    ListRetirementPlanningRgpsPeriodUseCase,
    GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase,
    GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase,
    CompareRetirementPlanningRgpsCnisCtpsUseCase,
    CreateRetirementPlanningRgpsTimeAcceleratorUseCase,
    ListRetirementPlanningRgpsTimeAcceleratorUseCase,
    DeleteRetirementPlanningRgpsTimeAcceleratorUseCase,
    AnalyzeRuralTimeUseCase,
    AnalyzeApprenticeStudentUseCase,
    AnalyzeWorkAbroadUseCase,
    AnalyzeRetirementPlanningRgpsPppUseCase,
    ConvertRetirementPlanningRgpsSpecialPeriodUseCase,
    AnalyzeInformalWorkUseCase,
    AnalyzeLaborCourtDecisionUseCase,
    AnalyzeMilitaryServiceUseCase,
    AnalyzePublicServiceUseCase,
    AnalyzeCtpsOutsideCnisUseCase,
    GetRetirementPlanningRgpsUseCase,
    CreateMultipleRetirementPlanningRgpsPeriodsUseCase,
    GetRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase,
    PeriodLeaveDateActionUseCase,
    PeriodConsiderationActionUseCase,
    GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase,
    GetRetirementPlanningRgpsDetailsUseCase,
  ],
  exports: [
    ListAnalysisToolClientLegalProceedingUseCaseGateway,
    GetAnalysisToolClientLegalProceedingUseCaseGateway,
    CreateRetirementPlanningRppsUseCase,
    CreateRetirementPlanningRppsRemunerationUseCase,
    CreateRetirementPlanningRppsResultUseCase,
    GetRetirementPlanningRppsUseCase,
    GetRetirementPlanningRppsRemunerationCalculationUseCase,
    ListRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsUseCase,
  ],
})
export class AnalysisToolModule {
  protected readonly _type = AnalysisToolModule.name;
}
