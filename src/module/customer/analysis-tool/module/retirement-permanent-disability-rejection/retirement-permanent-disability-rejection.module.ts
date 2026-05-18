import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RetirementPermanentDisabilityRejectionController } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.controller';
import { CreateRetirementPermanentDisabilityRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection-first-analysis.use-case';
import { CreateRetirementPermanentDisabilityRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection-inss-decision-analysis.use-case';
import { CreateRetirementPermanentDisabilityRejectionResultUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection-result.use-case';
import { CreateRetirementPermanentDisabilityRejectionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection.use-case';
import { DownloadRetirementPermanentDisabilityRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/download-retirement-permanent-disability-rejection-complete-analysis.use-case';
import { DownloadRetirementPermanentDisabilityRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/download-retirement-permanent-disability-rejection-simplified-analysis.use-case';
import { GetRetirementPermanentDisabilityRejectionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/get-retirement-permanent-disability-rejection.use-case';
import { SaveRetirementPermanentDisabilityRejectionIncapacityUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/save-retirement-permanent-disability-rejection-incapacity.use-case';
import { SaveRetirementPermanentDisabilityRejectionInsuredQualityUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/save-retirement-permanent-disability-rejection-insured-quality.use-case';
import { SaveRetirementPermanentDisabilityRejectionPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/save-retirement-permanent-disability-rejection-periods.use-case';
import { UpdateRetirementPermanentDisabilityRejectionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/update-retirement-permanent-disability-rejection.use-case';
import { UploadRetirementPermanentDisabilityRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/upload-retirement-permanent-disability-rejection-documents.use-case';
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
  controllers: [RetirementPermanentDisabilityRejectionController],
  providers: [
    CreateRetirementPermanentDisabilityRejectionUseCase,
    GetRetirementPermanentDisabilityRejectionUseCase,
    UploadRetirementPermanentDisabilityRejectionDocumentsUseCase,
    CreateRetirementPermanentDisabilityRejectionInssDecisionAnalysisUseCase,
    SaveRetirementPermanentDisabilityRejectionIncapacityUseCase,
    SaveRetirementPermanentDisabilityRejectionInsuredQualityUseCase,
    CreateRetirementPermanentDisabilityRejectionFirstAnalysisUseCase,
    SaveRetirementPermanentDisabilityRejectionPeriodsUseCase,
    UpdateRetirementPermanentDisabilityRejectionUseCase,
    CreateRetirementPermanentDisabilityRejectionResultUseCase,
    DownloadRetirementPermanentDisabilityRejectionCompleteAnalysisUseCase,
    DownloadRetirementPermanentDisabilityRejectionSimplifiedAnalysisUseCase,
  ],
})
export class RetirementPermanentDisabilityRejectionModule {
  protected readonly _type = RetirementPermanentDisabilityRejectionModule.name;
}
