import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { DocumentGeneratorProcessorModule } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.module';
import { CreatePovertyDeclarationGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/poverty-declaration/use-case/create-poverty-declaration-generator.use-case';
import { DownloadPovertyDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/poverty-declaration/use-case/download-poverty-declaration-generator-complete-analysis.use-case';
import { UpdatePovertyDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/poverty-declaration/use-case/update-poverty-declaration-generator-complete-analysis.use-case';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';

@Module({
  imports: [
    DatabaseModule,
    DocumentGeneratorProcessorModule,
    PaymentPlanModule,
    ExportDocumentModule,
    OrganizationCustomizationExportDocumentOptionsResolverModule,
  ],
  providers: [
    CreatePovertyDeclarationGeneratorUseCase,
    DownloadPovertyDeclarationGeneratorCompleteAnalysisUseCase,
    UpdatePovertyDeclarationGeneratorCompleteAnalysisUseCase,
  ],
  exports: [
    CreatePovertyDeclarationGeneratorUseCase,
    DownloadPovertyDeclarationGeneratorCompleteAnalysisUseCase,
    UpdatePovertyDeclarationGeneratorCompleteAnalysisUseCase,
  ],
})
export class PovertyDeclarationGeneratorModule {
  protected readonly _type = PovertyDeclarationGeneratorModule.name;
}
