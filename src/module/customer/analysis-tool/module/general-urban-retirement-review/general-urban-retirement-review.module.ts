import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { GeneralUrbanRetirementReviewController } from '@module/customer/analysis-tool/module/general-urban-retirement-review/general-urban-retirement-review.controller';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeGeneralUrbanRetirementReviewPppUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-general-urban-retirement-review-ppp.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-public-service.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-work-abroad.use-case';
import { CompareGeneralUrbanRetirementReviewCnisCtpsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/compare-general-urban-retirement-review-cnis-ctps.use-case';
import { ConvertGeneralUrbanRetirementReviewSpecialPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/convert-general-urban-retirement-review-special-period.use-case';
import { CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-benefit-award-letter-analysis.use-case';
import { CreateGeneralUrbanRetirementReviewCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-cnis.use-case';
import { CreateGeneralUrbanRetirementReviewFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-first-analysis.use-case';
import { CreateGeneralUrbanRetirementReviewPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-period-document.use-case';
import { CreateGeneralUrbanRetirementReviewPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-period.use-case';
import { CreateGeneralUrbanRetirementReviewResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-result.use-case';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-time-accelerator.use-case';
import { CreateGeneralUrbanRetirementReviewUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review.use-case';
import { CreateMultipleGeneralUrbanRetirementReviewPeriodsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-multiple-general-urban-retirement-review-periods.use-case';
import { DeleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/delete-general-urban-retirement-review-time-accelerator.use-case';
import { DownloadGeneralUrbanRetirementReviewCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/download-general-urban-retirement-review-complete-analysis.use-case';
import { DownloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/download-general-urban-retirement-review-simplified-analysis.use-case';
import { GetGeneralUrbanRetirementReviewDetailsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-details.use-case';
import { GetGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-period-earnings-below-minimum.use-case';
import { GetGeneralUrbanRetirementReviewPeriodEarningsOverdueUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-period-earnings-overdue.use-case';
import { GetGeneralUrbanRetirementReviewPeriodEarningsWithoutLeaveDateUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-period-earnings-without-leave-date.use-case';
import { GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-time-accelerator-from-analysis.use-case';
import { GetGeneralUrbanRetirementReviewUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review.use-case';
import { ListGeneralUrbanRetirementReviewPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/list-general-urban-retirement-review-period.use-case';
import { ListGeneralUrbanRetirementReviewTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/list-general-urban-retirement-review-time-accelerator.use-case';
import { PeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/period-consideration-action.use-case';
import { PeriodLeaveDateActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/period-leave-date-action.use-case';
import { UpdateGeneralUrbanRetirementReviewClientUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/update-general-urban-retirement-review-client.use-case';
import { UpdateGeneralUrbanRetirementReviewPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/update-general-urban-retirement-review-period.use-case';
import { UpdateGeneralUrbanRetirementReviewResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/update-general-urban-retirement-review-result.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    GenerativeIaModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    CnisAnalyzerModule,
    ExportDocumentModule,
  ],
  controllers: [GeneralUrbanRetirementReviewController],
  providers: [
    AnalyzeApprenticeStudentUseCase,
    AnalyzeCtpsOutsideCnisUseCase,
    AnalyzeGeneralUrbanRetirementReviewPppUseCase,
    AnalyzeInformalWorkUseCase,
    AnalyzeLaborCourtDecisionUseCase,
    AnalyzeMilitaryServiceUseCase,
    AnalyzePublicServiceUseCase,
    AnalyzeRuralTimeUseCase,
    AnalyzeWorkAbroadUseCase,
    CompareGeneralUrbanRetirementReviewCnisCtpsUseCase,
    ConvertGeneralUrbanRetirementReviewSpecialPeriodUseCase,
    CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase,
    CreateGeneralUrbanRetirementReviewCnisUseCase,
    CreateGeneralUrbanRetirementReviewFirstAnalysisUseCase,
    CreateGeneralUrbanRetirementReviewPeriodDocumentUseCase,
    CreateGeneralUrbanRetirementReviewPeriodUseCase,
    CreateGeneralUrbanRetirementReviewResultUseCase,
    CreateGeneralUrbanRetirementReviewTimeAcceleratorUseCase,
    CreateGeneralUrbanRetirementReviewUseCase,
    CreateMultipleGeneralUrbanRetirementReviewPeriodsUseCase,
    DeleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase,
    DownloadGeneralUrbanRetirementReviewCompleteAnalysisUseCase,
    DownloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase,
    GetGeneralUrbanRetirementReviewDetailsUseCase,
    GetGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase,
    GetGeneralUrbanRetirementReviewPeriodEarningsOverdueUseCase,
    GetGeneralUrbanRetirementReviewPeriodEarningsWithoutLeaveDateUseCase,
    GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase,
    GetGeneralUrbanRetirementReviewUseCase,
    ListGeneralUrbanRetirementReviewPeriodUseCase,
    ListGeneralUrbanRetirementReviewTimeAcceleratorUseCase,
    PeriodConsiderationActionUseCase,
    PeriodLeaveDateActionUseCase,
    UpdateGeneralUrbanRetirementReviewClientUseCase,
    UpdateGeneralUrbanRetirementReviewPeriodUseCase,
    UpdateGeneralUrbanRetirementReviewResultUseCase,
  ],
})
export class GeneralUrbanRetirementReviewModule {
  protected readonly _type = GeneralUrbanRetirementReviewModule.name;
}
