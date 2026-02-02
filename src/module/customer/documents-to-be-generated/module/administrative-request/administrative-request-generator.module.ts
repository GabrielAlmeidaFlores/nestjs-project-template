import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AdministrativeRequestGeneratorController } from '@module/customer/documents-to-be-generated/module/administrative-request/administrative-request-generator.controller';
import { CreateAdministrativeRequestGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/create-administrative-request-generator.use-case';
import { DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/download-administrative-request-generator-complete-analysis.use-case';
import { DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/download-administrative-request-generator-simplified-analysis.use-case';

@Module({
  imports: [DatabaseModule, AnalysisProcessorModule, PaymentPlanModule, ExportDocumentModule],
  controllers: [AdministrativeRequestGeneratorController],
  providers: [
    CreateAdministrativeRequestGeneratorUseCase,
    DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase,
    DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase,
  ],
  exports: [CreateAdministrativeRequestGeneratorUseCase],
})
export class AdministrativeRequestGeneratorModule {
  protected readonly _type = AdministrativeRequestGeneratorModule.name;
}
