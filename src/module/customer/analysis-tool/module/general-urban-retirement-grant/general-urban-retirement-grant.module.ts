import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { GeneralUrbanRetirementGrantController } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/general-urban-retirement-grant.controller';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeGeneralUrbanRetirementGrantPppUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-general-urban-retirement-grant-ppp.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-public-service.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-work-abroad.use-case';
import { CompareGeneralUrbanRetirementGrantCnisCtpsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/compare-general-urban-retirement-grant-cnis-ctps.use-case';
import { ConvertGeneralUrbanRetirementGrantSpecialPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/convert-general-urban-retirement-grant-special-period.use-case';
import { CreateGeneralUrbanRetirementGrantCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-cnis.use-case';
import { CreateGeneralUrbanRetirementGrantPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-period-document.use-case';
import { CreateGeneralUrbanRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-period.use-case';
import { CreateGeneralUrbanRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-result.use-case';
import { CreateGeneralUrbanRetirementGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-time-accelerator.use-case';
import { CreateGeneralUrbanRetirementGrantUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant.use-case';
import { CreateMultipleGeneralUrbanRetirementGrantPeriodsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-multiple-general-urban-retirement-grant-periods.use-case';
import { DeleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/delete-general-urban-retirement-grant-time-accelerator.use-case';
import { GetGeneralUrbanRetirementGrantDetailsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-details.use-case';
import { GetGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-period-earnings-below-minimum.use-case';
import { GetGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-period-earnings-overdue.use-case';
import { GetGeneralUrbanRetirementGrantPeriodEarningsWithoutLeaveDateUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-period-earnings-without-leave-date.use-case';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-time-accelerator-from-analysis.use-case';
import { GetGeneralUrbanRetirementGrantUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant.use-case';
import { ListGeneralUrbanRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/list-general-urban-retirement-grant-period.use-case';
import { ListGeneralUrbanRetirementGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/list-general-urban-retirement-grant-time-accelerator.use-case';
import { PeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/period-consideration-action.use-case';
import { PeriodLeaveDateActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/period-leave-date-action.use-case';
import { UpdateGeneralUrbanRetirementGrantClientUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/update-general-urban-retirement-grant-client.use-case';
import { UpdateGeneralUrbanRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/update-general-urban-retirement-grant-period.use-case';
import { UpdateGeneralUrbanRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/update-general-urban-retirement-grant-result.use-case';
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
  ],
  controllers: [GeneralUrbanRetirementGrantController],
  providers: [
    AnalyzeApprenticeStudentUseCase,
    AnalyzeCtpsOutsideCnisUseCase,
    AnalyzeGeneralUrbanRetirementGrantPppUseCase,
    AnalyzeInformalWorkUseCase,
    AnalyzeLaborCourtDecisionUseCase,
    AnalyzeMilitaryServiceUseCase,
    AnalyzePublicServiceUseCase,
    AnalyzeRuralTimeUseCase,
    AnalyzeWorkAbroadUseCase,
    CompareGeneralUrbanRetirementGrantCnisCtpsUseCase,
    ConvertGeneralUrbanRetirementGrantSpecialPeriodUseCase,
    CreateGeneralUrbanRetirementGrantCnisUseCase,
    CreateGeneralUrbanRetirementGrantPeriodDocumentUseCase,
    CreateGeneralUrbanRetirementGrantPeriodUseCase,
    CreateGeneralUrbanRetirementGrantResultUseCase,
    CreateGeneralUrbanRetirementGrantTimeAcceleratorUseCase,
    CreateGeneralUrbanRetirementGrantUseCase,
    CreateMultipleGeneralUrbanRetirementGrantPeriodsUseCase,
    DeleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase,
    GetGeneralUrbanRetirementGrantDetailsUseCase,
    GetGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumUseCase,
    GetGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase,
    GetGeneralUrbanRetirementGrantPeriodEarningsWithoutLeaveDateUseCase,
    GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase,
    GetGeneralUrbanRetirementGrantUseCase,
    ListGeneralUrbanRetirementGrantPeriodUseCase,
    ListGeneralUrbanRetirementGrantTimeAcceleratorUseCase,
    PeriodConsiderationActionUseCase,
    PeriodLeaveDateActionUseCase,
    UpdateGeneralUrbanRetirementGrantClientUseCase,
    UpdateGeneralUrbanRetirementGrantPeriodUseCase,
    UpdateGeneralUrbanRetirementGrantResultUseCase,
  ],
})
export class GeneralUrbanRetirementGrantModule {
  protected readonly _type = GeneralUrbanRetirementGrantModule.name;
}
