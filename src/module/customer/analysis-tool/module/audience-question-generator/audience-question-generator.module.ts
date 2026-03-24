import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { AudienceQuestionGeneratorController } from '@module/customer/analysis-tool/module/audience-question-generator/audience-question-generator.controller';
import { CreateAudienceQuestionGeneratorResultUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator-result.use-case';
import { CreateAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator.use-case';
import { DeleteAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/delete-audience-question-generator.use-case';
import { DownloadAudienceQuestionGeneratorCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/download-audience-question-generator-complete-analysis.use-case';
import { DownloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/download-audience-question-generator-simplified-analysis.use-case';
import { GetAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/get-audience-question-generator.use-case';
import { UpdateAudienceQuestionGeneratorResultUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/update-audience-question-generator-result.use-case';
import { UpdateAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/update-audience-question-generator.use-case';
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
  ],
  controllers: [AudienceQuestionGeneratorController],
  providers: [
    CreateAudienceQuestionGeneratorUseCase,
    CreateAudienceQuestionGeneratorResultUseCase,
    UpdateAudienceQuestionGeneratorUseCase,
    UpdateAudienceQuestionGeneratorResultUseCase,
    DownloadAudienceQuestionGeneratorCompleteAnalysisUseCase,
    DownloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase,
    GetAudienceQuestionGeneratorUseCase,
    DeleteAudienceQuestionGeneratorUseCase,
  ],
  exports: [DeleteAudienceQuestionGeneratorUseCase],
})
export class AudienceQuestionGeneratorModule {
  protected readonly _type = AudienceQuestionGeneratorModule.name;
}
