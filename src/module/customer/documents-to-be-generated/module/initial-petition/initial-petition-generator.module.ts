import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { InitialPetitionGeneratorController } from '@module/customer/documents-to-be-generated/module/initial-petition/initial-petition-generator.controller';
import { CreateInitialPetitionGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/create-initial-petition-generator.use-case';
import { DownloadInitialPetitionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/download-initial-petition-generator-complete-analysis.use-case';
import { DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/download-initial-petition-generator-simplified-analysis.use-case';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';

@Module({
  imports: [
    DatabaseModule,
    AnalysisProcessorModule,
    PaymentPlanModule,
    ExportDocumentModule,
  ],
  controllers: [InitialPetitionGeneratorController],
  providers: [
    CreateInitialPetitionGeneratorUseCase,
    DownloadInitialPetitionGeneratorCompleteAnalysisUseCase,
    DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase,
  ],
  exports: [CreateInitialPetitionGeneratorUseCase],
})
export class InitialPetitionGeneratorModule {
  protected readonly _type = InitialPetitionGeneratorModule.name;
}
