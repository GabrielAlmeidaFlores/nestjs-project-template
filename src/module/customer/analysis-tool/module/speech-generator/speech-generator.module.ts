import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { MarkdownConverterModule } from '@lib/markdown-converter/markdown-converter.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { SpeechGeneratorController } from '@module/customer/analysis-tool/module/speech-generator/speech-generator.controller';
import { CreateSpeechGeneratorResultUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/create-speech-generator-result.use-case';
import { CreateSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/create-speech-generator.use-case';
import { DeleteSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/delete-speech-generator.use-case';
import { DownloadSpeechGeneratorCompleteContentUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/download-speech-generator-complete-content.use-case';
import { DownloadSpeechGeneratorSimplifiedContentUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/download-speech-generator-simplified-content.use-case';
import { GetSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/get-speech-generator.use-case';
import { UpdateSpeechGeneratorResultCompleteContentUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/update-speech-generator-result-complete-content.use-case';
import { UpdateSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/update-speech-generator.use-case';
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
    AnalysisProcessorModule,
    AnalysisActivityTrackerModule,
    FileProcessorModule,
    ExportDocumentModule,
    MarkdownConverterModule,
  ],
  controllers: [SpeechGeneratorController],
  providers: [
    CreateSpeechGeneratorUseCase,
    CreateSpeechGeneratorResultUseCase,
    GetSpeechGeneratorUseCase,
    UpdateSpeechGeneratorUseCase,
    UpdateSpeechGeneratorResultCompleteContentUseCase,
    DownloadSpeechGeneratorCompleteContentUseCase,
    DownloadSpeechGeneratorSimplifiedContentUseCase,
    DeleteSpeechGeneratorUseCase,
  ],
  exports: [DeleteSpeechGeneratorUseCase],
})
export class SpeechGeneratorModule {
  protected readonly _type = SpeechGeneratorModule.name;
}
