import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { SpecialActivityAnalysisController } from '@module/customer/analysis-tool/module/special-activity-analysis/special-activity-analysis.controller';
import { CreateSpecialActivityAnalysisResultUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/create-special-activity-analysis-result.use-case';
import { CreateSpecialActivityAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/create-special-activity-analysis.use-case';
import { DownloadSpecialActivityAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/download-special-activity-analysis-complete-analysis.use-case';
import { DownloadSpecialActivityAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/download-special-activity-analysis-simplified-analysis.use-case';
import { GetSpecialActivityAnalysisByIdUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/get-special-activity-analysis-by-id.use-case';
import { UpdateSpecialActivityAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/update-special-activity-analysis.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AnalysisActivityTrackerModule,
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    GenerativeIaModule,
    OrganizationCustomizationExportDocumentOptionsResolverModule,
  ],
  controllers: [SpecialActivityAnalysisController],
  providers: [
    CreateSpecialActivityAnalysisUseCase,
    UpdateSpecialActivityAnalysisUseCase,
    GetSpecialActivityAnalysisByIdUseCase,
    CreateSpecialActivityAnalysisResultUseCase,
    DownloadSpecialActivityAnalysisCompleteAnalysisUseCase,
    DownloadSpecialActivityAnalysisSimplifiedAnalysisUseCase,
  ],
  exports: [
    CreateSpecialActivityAnalysisUseCase,
    UpdateSpecialActivityAnalysisUseCase,
    GetSpecialActivityAnalysisByIdUseCase,
    CreateSpecialActivityAnalysisResultUseCase,
    DownloadSpecialActivityAnalysisCompleteAnalysisUseCase,
    DownloadSpecialActivityAnalysisSimplifiedAnalysisUseCase,
  ],
})
export class SpecialActivityAnalysisModule {
  protected readonly _type = SpecialActivityAnalysisModule.name;
}
