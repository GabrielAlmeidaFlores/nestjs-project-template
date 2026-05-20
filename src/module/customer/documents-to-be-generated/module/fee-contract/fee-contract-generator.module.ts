import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { DocumentGeneratorProcessorModule } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.module';
import { CreateFeeContractGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/fee-contract/use-case/create-fee-contract-generator.use-case';
import { DownloadFeeContractGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/fee-contract/use-case/download-fee-contract-generator-complete-analysis.use-case';
import { UpdateFeeContractGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/fee-contract/use-case/update-fee-contract-generator-complete-analysis.use-case';
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
    CreateFeeContractGeneratorUseCase,
    DownloadFeeContractGeneratorCompleteAnalysisUseCase,
    UpdateFeeContractGeneratorCompleteAnalysisUseCase,
  ],
  exports: [
    CreateFeeContractGeneratorUseCase,
    DownloadFeeContractGeneratorCompleteAnalysisUseCase,
    UpdateFeeContractGeneratorCompleteAnalysisUseCase,
  ],
})
export class FeeContractGeneratorModule {
  protected readonly _type = FeeContractGeneratorModule.name;
}
