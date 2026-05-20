import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { DisabilityRetirementPlanningRejectionController } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/disability-retirement-planning-rejection.controller';
import { AnalyzeDisabilityRetirementPlanningRejectionPppUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/analyze-disability-retirement-planning-rejection-ppp.use-case';
import { AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/analyze-disability-retirement-planning-rejection-time-accelerator.use-case';
import { CreateDisabilityRetirementPlanningRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection-first-analysis.use-case';
import { CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection-inss-decision-analysis.use-case';
import { CreateDisabilityRetirementPlanningRejectionResultUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection-result.use-case';
import { CreateDisabilityRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection.use-case';
import { DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/delete-disability-retirement-planning-rejection-time-accelerator.use-case';
import { DownloadDisabilityRetirementPlanningRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/download-disability-retirement-planning-rejection-complete-analysis.use-case';
import { DownloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/download-disability-retirement-planning-rejection-simplified-analysis.use-case';
import { GetDisabilityRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/get-disability-retirement-planning-rejection.use-case';
import { ListDisabilityRetirementPlanningRejectionPeriodsUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/list-disability-retirement-planning-rejection-periods.use-case';
import { ListDisabilityRetirementPlanningRejectionTimeAcceleratorsUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/list-disability-retirement-planning-rejection-time-accelerators.use-case';
import { SaveDisabilityRetirementPlanningRejectionPeriodsUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/save-disability-retirement-planning-rejection-periods.use-case';
import { UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/update-disability-retirement-planning-rejection-time-accelerator.use-case';
import { UpdateDisabilityRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/update-disability-retirement-planning-rejection.use-case';
import { UploadDisabilityRetirementPlanningRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/upload-disability-retirement-planning-rejection-documents.use-case';
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
  controllers: [DisabilityRetirementPlanningRejectionController],
  providers: [
    CreateDisabilityRetirementPlanningRejectionUseCase,
    GetDisabilityRetirementPlanningRejectionUseCase,
    UploadDisabilityRetirementPlanningRejectionDocumentsUseCase,
    CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase,
    CreateDisabilityRetirementPlanningRejectionFirstAnalysisUseCase,
    SaveDisabilityRetirementPlanningRejectionPeriodsUseCase,
    UpdateDisabilityRetirementPlanningRejectionUseCase,
    AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase,
    UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase,
    DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase,
    AnalyzeDisabilityRetirementPlanningRejectionPppUseCase,
    CreateDisabilityRetirementPlanningRejectionResultUseCase,
    DownloadDisabilityRetirementPlanningRejectionCompleteAnalysisUseCase,
    DownloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase,
    ListDisabilityRetirementPlanningRejectionPeriodsUseCase,
    ListDisabilityRetirementPlanningRejectionTimeAcceleratorsUseCase,
  ],
})
export class DisabilityRetirementPlanningRejectionModule {
  protected readonly _type = DisabilityRetirementPlanningRejectionModule.name;
}
