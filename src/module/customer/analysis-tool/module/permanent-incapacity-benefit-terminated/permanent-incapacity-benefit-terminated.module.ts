import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { PermanentIncapacityBenefitTerminatedController } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.controller';
import { CreatePermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-complete-analysis-download.use-case';
import { CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-disability-analysis.use-case';
import { CreatePermanentIncapacityBenefitTerminatedFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-first-analysis.use-case';
import { CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-inss-decision-analysis.use-case';
import { CreatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-insured-status.use-case';
import { CreatePermanentIncapacityBenefitTerminatedResultUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-result.use-case';
import { CreatePermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-simplified-analysis-download.use-case';
import { CreatePermanentIncapacityBenefitTerminatedUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated.use-case';
import { GetPermanentIncapacityBenefitTerminatedUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/get-permanent-incapacity-benefit-terminated.use-case';
import { SavePermanentIncapacityBenefitTerminatedPeriodsUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/save-permanent-incapacity-benefit-terminated-periods.use-case';
import { UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/update-permanent-incapacity-benefit-terminated-disability-analysis.use-case';
import { UpdatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/update-permanent-incapacity-benefit-terminated-insured-status.use-case';
import { UpdatePermanentIncapacityBenefitTerminatedUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/update-permanent-incapacity-benefit-terminated.use-case';
import { UploadPermanentIncapacityBenefitTerminatedDocumentsUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/upload-permanent-incapacity-benefit-terminated-documents.use-case';
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
  controllers: [PermanentIncapacityBenefitTerminatedController],
  providers: [
    CreatePermanentIncapacityBenefitTerminatedUseCase,
    GetPermanentIncapacityBenefitTerminatedUseCase,
    UpdatePermanentIncapacityBenefitTerminatedUseCase,
    UploadPermanentIncapacityBenefitTerminatedDocumentsUseCase,
    CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase,
    CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase,
    UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase,
    CreatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase,
    UpdatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase,
    SavePermanentIncapacityBenefitTerminatedPeriodsUseCase,
    CreatePermanentIncapacityBenefitTerminatedFirstAnalysisUseCase,
    CreatePermanentIncapacityBenefitTerminatedResultUseCase,
    CreatePermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadUseCase,
    CreatePermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase,
  ],
})
export class PermanentIncapacityBenefitTerminatedModule {
  protected readonly _type = PermanentIncapacityBenefitTerminatedModule.name;
}
