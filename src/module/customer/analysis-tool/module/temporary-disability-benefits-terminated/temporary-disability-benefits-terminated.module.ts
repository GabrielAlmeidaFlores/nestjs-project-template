import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { TemporaryDisabilityBenefitsTerminatedController } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.controller';
import { CreateTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-complete-analysis-download.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-disability-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-first-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-inss-decision-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-insured-status.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedResultUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-result.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-simplified-analysis-download.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated.use-case';
import { GetTemporaryDisabilityBenefitsTerminatedUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/get-temporary-disability-benefits-terminated.use-case';
import { SaveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/save-temporary-disability-benefits-terminated-periods.use-case';
import { UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/update-temporary-disability-benefits-terminated-disability-analysis.use-case';
import { UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/update-temporary-disability-benefits-terminated-insured-status.use-case';
import { UpdateTemporaryDisabilityBenefitsTerminatedUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/update-temporary-disability-benefits-terminated.use-case';
import { UploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/upload-temporary-disability-benefits-terminated-documents.use-case';
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
  controllers: [TemporaryDisabilityBenefitsTerminatedController],
  providers: [
    CreateTemporaryDisabilityBenefitsTerminatedUseCase,
    GetTemporaryDisabilityBenefitsTerminatedUseCase,
    UpdateTemporaryDisabilityBenefitsTerminatedUseCase,
    UploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase,
    CreateTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisUseCase,
    CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase,
    UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase,
    CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase,
    UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase,
    SaveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase,
    CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase,
    CreateTemporaryDisabilityBenefitsTerminatedResultUseCase,
    CreateTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase,
    CreateTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase,
  ],
})
export class TemporaryDisabilityBenefitsTerminatedModule {
  protected readonly _type = TemporaryDisabilityBenefitsTerminatedModule.name;
}
