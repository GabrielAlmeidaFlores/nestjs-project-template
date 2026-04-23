import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { AccidentAssistanceTerminatedController } from '@module/customer/analysis-tool/module/accident-assistance-terminated/accident-assistance-terminated.controller';
import { CreateAccidentAssistanceTerminatedDecisionDetailsUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated-decision-details.use-case';
import { CreateAccidentAssistanceTerminatedResultUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated-result.use-case';
import { CreateAccidentAssistanceTerminatedUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated.use-case';
import { DeleteAccidentAssistanceTerminatedUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/delete-accident-assistance-terminated.use-case';
import { DownloadAccidentAssistanceTerminatedCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/download-accident-assistance-terminated-complete-analysis.use-case';
import { DownloadAccidentAssistanceTerminatedSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/download-accident-assistance-terminated-simplified-analysis.use-case';
import { GetAccidentAssistanceTerminatedUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/get-accident-assistance-terminated.use-case';
import { UpdateAccidentAssistanceTerminatedUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/update-accident-assistance-terminated.use-case';
import { UploadAccidentAssistanceTerminatedDocumentsUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/upload-accident-assistance-terminated-documents.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisActivityTrackerModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    OrganizationCustomizationExportDocumentOptionsResolverModule,
  ],
  controllers: [AccidentAssistanceTerminatedController],
  providers: [
    CreateAccidentAssistanceTerminatedUseCase,
    CreateAccidentAssistanceTerminatedResultUseCase,
    CreateAccidentAssistanceTerminatedDecisionDetailsUseCase,
    GetAccidentAssistanceTerminatedUseCase,
    DeleteAccidentAssistanceTerminatedUseCase,
    DownloadAccidentAssistanceTerminatedCompleteAnalysisUseCase,
    DownloadAccidentAssistanceTerminatedSimplifiedAnalysisUseCase,
    UpdateAccidentAssistanceTerminatedUseCase,
    UploadAccidentAssistanceTerminatedDocumentsUseCase,
  ],
  exports: [DeleteAccidentAssistanceTerminatedUseCase],
})
export class AccidentAssistanceTerminatedModule {
  protected readonly _type = AccidentAssistanceTerminatedModule.name;
}
