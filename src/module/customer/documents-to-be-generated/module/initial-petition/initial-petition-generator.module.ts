import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { DocumentGeneratorProcessorModule } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.module';
import { InitialPetitionGeneratorController } from '@module/customer/documents-to-be-generated/module/initial-petition/initial-petition-generator.controller';
import { CreateInitialPetitionGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/create-initial-petition-generator.use-case';
import { DownloadInitialPetitionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/download-initial-petition-generator-complete-analysis.use-case';
import { DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/download-initial-petition-generator-simplified-analysis.use-case';
import { UpdateInitialPetitionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/update-initial-petition-generator-complete-analysis.use-case';
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
  controllers: [InitialPetitionGeneratorController],
  providers: [
    CreateInitialPetitionGeneratorUseCase,
    DownloadInitialPetitionGeneratorCompleteAnalysisUseCase,
    DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase,
    UpdateInitialPetitionGeneratorCompleteAnalysisUseCase,
  ],
  exports: [CreateInitialPetitionGeneratorUseCase],
})
export class InitialPetitionGeneratorModule {
  protected readonly _type = InitialPetitionGeneratorModule.name;
}
