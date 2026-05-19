import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { DocumentGeneratorProcessorModule } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.module';
import { CreateJefWaiverDeclarationGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/use-case/create-jef-waiver-declaration-generator.use-case';
import { DownloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/use-case/download-jef-waiver-declaration-generator-complete-analysis.use-case';
import { UpdateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/use-case/update-jef-waiver-declaration-generator-complete-analysis.use-case';
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
    CreateJefWaiverDeclarationGeneratorUseCase,
    DownloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase,
    UpdateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase,
  ],
  exports: [
    CreateJefWaiverDeclarationGeneratorUseCase,
    DownloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase,
    UpdateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase,
  ],
})
export class JefWaiverDeclarationGeneratorModule {
  protected readonly _type = JefWaiverDeclarationGeneratorModule.name;
}
