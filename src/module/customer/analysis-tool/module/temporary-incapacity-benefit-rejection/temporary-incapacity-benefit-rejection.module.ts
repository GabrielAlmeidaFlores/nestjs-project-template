import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { TemporaryIncapacityBenefitRejectionController } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.controller';
import { CreateTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-complete-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-disability-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-first-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-inss-decision-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-insured-status.use-case';
import { CreateTemporaryIncapacityBenefitRejectionResultUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-result.use-case';
import { CreateTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-simplified-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-work-periods.use-case';
import { CreateTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection.use-case';
import { GetTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/get-temporary-incapacity-benefit-rejection.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-disability-analysis.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-insured-status.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-work-periods.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection.use-case';
import { UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/upload-temporary-incapacity-benefit-rejection-documents.use-case';
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
  controllers: [TemporaryIncapacityBenefitRejectionController],
  providers: [
    CreateTemporaryIncapacityBenefitRejectionUseCase,
    GetTemporaryIncapacityBenefitRejectionUseCase,
    UpdateTemporaryIncapacityBenefitRejectionUseCase,
    UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase,
    CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase,
    CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase,
    UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase,
    CreateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase,
    UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase,
    CreateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase,
    UpdateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase,
    CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase,
    CreateTemporaryIncapacityBenefitRejectionResultUseCase,
    CreateTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase,
    CreateTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase,
  ],
})
export class TemporaryIncapacityBenefitRejectionModule {
  protected readonly _type = TemporaryIncapacityBenefitRejectionModule.name;
}
