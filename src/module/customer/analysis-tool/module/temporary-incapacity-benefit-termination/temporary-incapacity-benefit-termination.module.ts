import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { TemporaryIncapacityBenefitTerminationController } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.controller';
import { CreateTemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-complete-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-disability-analysis.use-case';
import { CreateTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-first-analysis.use-case';
import { CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-inss-decision-analysis.use-case';
import { CreateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-insured-status.use-case';
import { CreateTemporaryIncapacityBenefitTerminationResultUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-result.use-case';
import { CreateTemporaryIncapacityBenefitTerminationSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-simplified-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitTerminationUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination.use-case';
import { GetTemporaryIncapacityBenefitTerminationUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/get-temporary-incapacity-benefit-termination.use-case';
import { SaveTemporaryIncapacityBenefitTerminationPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/save-temporary-incapacity-benefit-termination-periods.use-case';
import { UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/update-temporary-incapacity-benefit-termination-disability-analysis.use-case';
import { UpdateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/update-temporary-incapacity-benefit-termination-insured-status.use-case';
import { UpdateTemporaryIncapacityBenefitTerminationUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/update-temporary-incapacity-benefit-termination.use-case';
import { UploadTemporaryIncapacityBenefitTerminationDocumentsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/upload-temporary-incapacity-benefit-termination-documents.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    GenerativeIaModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    CnisAnalyzerModule,
    MarkdownConverterModule,
  ],
  controllers: [TemporaryIncapacityBenefitTerminationController],
  providers: [
    CreateTemporaryIncapacityBenefitTerminationUseCase,
    GetTemporaryIncapacityBenefitTerminationUseCase,
    UpdateTemporaryIncapacityBenefitTerminationUseCase,
    UploadTemporaryIncapacityBenefitTerminationDocumentsUseCase,
    CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase,
    CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase,
    UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase,
    CreateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase,
    UpdateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase,
    SaveTemporaryIncapacityBenefitTerminationPeriodsUseCase,
    CreateTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase,
    CreateTemporaryIncapacityBenefitTerminationResultUseCase,
    CreateTemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadUseCase,
    CreateTemporaryIncapacityBenefitTerminationSimplifiedAnalysisDownloadUseCase,
  ],
})
export class TemporaryIncapacityBenefitTerminationModule {
  protected readonly _type = TemporaryIncapacityBenefitTerminationModule.name;
}
