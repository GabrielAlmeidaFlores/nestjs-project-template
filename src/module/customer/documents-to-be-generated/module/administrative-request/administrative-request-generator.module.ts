import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { DocumentGeneratorProcessorModule } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.module';
import { AdministrativeRequestGeneratorController } from '@module/customer/documents-to-be-generated/module/administrative-request/administrative-request-generator.controller';
import { CreateAdministrativeRequestGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/create-administrative-request-generator.use-case';
import { DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/download-administrative-request-generator-complete-analysis.use-case';
import { DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/download-administrative-request-generator-simplified-analysis.use-case';
import { UpdateAdministrativeRequestGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/update-administrative-request-generator-complete-analysis.use-case';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';

@Module({
  imports: [
    DatabaseModule,
    DocumentGeneratorProcessorModule,
    PaymentPlanModule,
    ExportDocumentModule,
  ],
  controllers: [AdministrativeRequestGeneratorController], // mudar nome dos gateways no use case de documentProcessorGateway para DocumentGeneratorProcessorGateway
  providers: [
    CreateAdministrativeRequestGeneratorUseCase,
    DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase,
    DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase,
    UpdateAdministrativeRequestGeneratorCompleteAnalysisUseCase,
  ],
  exports: [CreateAdministrativeRequestGeneratorUseCase],
})
export class AdministrativeRequestGeneratorModule {
  protected readonly _type = AdministrativeRequestGeneratorModule.name;
}
