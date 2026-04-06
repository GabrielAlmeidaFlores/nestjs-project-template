import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { DocumentGeneratorProcessorModule } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.module';
import { FullOpinionGeneratorController } from '@module/customer/documents-to-be-generated/module/full-opinion/full-opinion-generator.controller';
import { CreateFullOpinionGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/full-opinion/use-case/create-full-opinion-generator.use-case';
import { DownloadFullOpinionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/full-opinion/use-case/download-full-opinion-generator-complete-analysis.use-case';
import { DownloadFullOpinionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/full-opinion/use-case/download-full-opinion-generator-simplified-analysis.use-case';
import { UpdateFullOpinionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/full-opinion/use-case/update-full-opinion-generator-complete-analysis.use-case';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    DatabaseModule,
    DocumentGeneratorProcessorModule,
    PaymentPlanModule,
    ExportDocumentModule,
    OrganizationSessionModule,
    OrganizationCustomizationExportDocumentOptionsResolverModule,
  ],
  controllers: [FullOpinionGeneratorController],
  providers: [
    CreateFullOpinionGeneratorUseCase,
    DownloadFullOpinionGeneratorCompleteAnalysisUseCase,
    DownloadFullOpinionGeneratorSimplifiedAnalysisUseCase,
    UpdateFullOpinionGeneratorCompleteAnalysisUseCase,
  ],
  exports: [CreateFullOpinionGeneratorUseCase],
})
export class FullOpinionGeneratorModule {
  protected readonly _type = FullOpinionGeneratorModule.name;
}
