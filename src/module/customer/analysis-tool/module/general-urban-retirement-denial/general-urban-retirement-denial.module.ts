import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { GeneralUrbanRetirementDenialController } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/general-urban-retirement-denial.controller';
import { AnalyzeGeneralUrbanRetirementDenialPppUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/analyze-general-urban-retirement-denial-ppp.use-case';
import { AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/analyze-general-urban-retirement-denial-time-accelerator.use-case';
import { CompareGeneralUrbanRetirementDenialCnisCtpsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/compare-general-urban-retirement-denial-cnis-ctps.use-case';
import { CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-first-analysis.use-case';
import { CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-inss-decision-analysis.use-case';
import { CreateGeneralUrbanRetirementDenialResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-result.use-case';
import { CreateGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial.use-case';
import { DeleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/delete-general-urban-retirement-denial-time-accelerator.use-case';
import { DownloadGeneralUrbanRetirementDenialCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/download-general-urban-retirement-denial-complete-analysis.use-case';
import { DownloadGeneralUrbanRetirementDenialSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/download-general-urban-retirement-denial-simplified-analysis.use-case';
import { GetGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/get-general-urban-retirement-denial.use-case';
import { SaveGeneralUrbanRetirementDenialPeriodsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/save-general-urban-retirement-denial-periods.use-case';
import { UpdateGeneralUrbanRetirementDenialTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/update-general-urban-retirement-denial-time-accelerator.use-case';
import { UpdateGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/update-general-urban-retirement-denial.use-case';
import { UploadGeneralUrbanRetirementDenialDocumentsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/upload-general-urban-retirement-denial-documents.use-case';
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
  controllers: [GeneralUrbanRetirementDenialController],
  providers: [
    CreateGeneralUrbanRetirementDenialUseCase,
    GetGeneralUrbanRetirementDenialUseCase,
    UploadGeneralUrbanRetirementDenialDocumentsUseCase,
    CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase,
    CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase,
    SaveGeneralUrbanRetirementDenialPeriodsUseCase,
    UpdateGeneralUrbanRetirementDenialUseCase,
    AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase,
    UpdateGeneralUrbanRetirementDenialTimeAcceleratorUseCase,
    DeleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase,
    AnalyzeGeneralUrbanRetirementDenialPppUseCase,
    CompareGeneralUrbanRetirementDenialCnisCtpsUseCase,
    CreateGeneralUrbanRetirementDenialResultUseCase,
    DownloadGeneralUrbanRetirementDenialCompleteAnalysisUseCase,
    DownloadGeneralUrbanRetirementDenialSimplifiedAnalysisUseCase,
  ],
})
export class GeneralUrbanRetirementDenialModule {
  protected readonly _type = GeneralUrbanRetirementDenialModule.name;
}
