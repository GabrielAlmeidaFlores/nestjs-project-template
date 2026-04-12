import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { SurvivorPensionAnalysisController } from '@module/customer/analysis-tool/module/survivor-pension-analysis/survivor-pension-analysis.controller';
import { CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-benefit-originator-identification.use-case';
import { CreateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-customer-profile-identification.use-case';
import { CreateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-deceased-work-history-period.use-case';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-deceased-work-history.use-case';
import { CreateSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-result-dependent-pension-analysis.use-case';
import { CreateSurvivorPensionAnalysisResultRetirementRuleUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-result-retirement-rule.use-case';
import { CreateSurvivorPensionAnalysisResultUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-result.use-case';
import { CreateSurvivorPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis.use-case';
import { DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-benefit-originator-identification.use-case';
import { DeleteSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-customer-profile-identification.use-case';
import { DeleteSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-deceased-work-history-period.use-case';
import { DeleteSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-deceased-work-history.use-case';
import { DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-result-dependent-pension-analysis.use-case';
import { DeleteSurvivorPensionAnalysisResultRetirementRuleUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-result-retirement-rule.use-case';
import { DeleteSurvivorPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis.use-case';
import { DownloadSurvivorPensionAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/download-survivor-pension-analysis-complete-analysis.use-case';
import { DownloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/download-survivor-pension-analysis-simplified-analysis.use-case';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-benefit-originator-identification.use-case';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-customer-profile-identification.use-case';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-deceased-work-history-period.use-case';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-deceased-work-history.use-case';
import { GetSurvivorPensionAnalysisResultUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-result.use-case';
import { GetSurvivorPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis.use-case';
import { ListSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-deceased-work-history-periods.use-case';
import { ListSurvivorPensionAnalysisResultDependentPensionAnalysesUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-result-dependent-pension-analyses.use-case';
import { ListSurvivorPensionAnalysisResultRetirementRulesUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-result-retirement-rules.use-case';
import { PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-benefit-originator-identification-documents.use-case';
import { PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-customer-profile-identification-documents.use-case';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-benefit-dependents-documents.use-case';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-work-history-period-documents.use-case';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-work-history-periods.use-case';
import { UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-benefit-originator-identification.use-case';
import { UpdateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-customer-profile-identification.use-case';
import { UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-deceased-work-history-period.use-case';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-deceased-work-history.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
  ],
  controllers: [SurvivorPensionAnalysisController],
  providers: [
    CreateSurvivorPensionAnalysisUseCase,
    GetSurvivorPensionAnalysisUseCase,
    DeleteSurvivorPensionAnalysisUseCase,
    CreateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    UpdateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    DeleteSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    GetSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsUseCase,
    CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsUseCase,
    CreateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    UpdateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    DeleteSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    GetSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase,
    PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase,
    PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsUseCase,
    CreateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    DeleteSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    ListSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    PutSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsUseCase,
    GetSurvivorPensionAnalysisResultUseCase,
    CreateSurvivorPensionAnalysisResultUseCase,
    CreateSurvivorPensionAnalysisResultRetirementRuleUseCase,
    DeleteSurvivorPensionAnalysisResultRetirementRuleUseCase,
    ListSurvivorPensionAnalysisResultRetirementRulesUseCase,
    CreateSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase,
    DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase,
    ListSurvivorPensionAnalysisResultDependentPensionAnalysesUseCase,
    DownloadSurvivorPensionAnalysisCompleteAnalysisUseCase,
    DownloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase,
  ],
  exports: [],
})
export class SurvivorPensionAnalysisModule {
  protected readonly _type = SurvivorPensionAnalysisModule.name;
}
