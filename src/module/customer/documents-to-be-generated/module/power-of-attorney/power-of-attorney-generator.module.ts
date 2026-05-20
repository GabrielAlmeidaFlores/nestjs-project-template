import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { DocumentGeneratorProcessorModule } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.module';
import { CreatePowerOfAttorneyGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/power-of-attorney/use-case/create-power-of-attorney-generator.use-case';
import { DownloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/power-of-attorney/use-case/download-power-of-attorney-generator-complete-analysis.use-case';
import { UpdatePowerOfAttorneyGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/power-of-attorney/use-case/update-power-of-attorney-generator-complete-analysis.use-case';
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
    CreatePowerOfAttorneyGeneratorUseCase,
    DownloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase,
    UpdatePowerOfAttorneyGeneratorCompleteAnalysisUseCase,
  ],
  exports: [
    CreatePowerOfAttorneyGeneratorUseCase,
    DownloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase,
    UpdatePowerOfAttorneyGeneratorCompleteAnalysisUseCase,
  ],
})
export class PowerOfAttorneyGeneratorModule {
  protected readonly _type = PowerOfAttorneyGeneratorModule.name;
}
