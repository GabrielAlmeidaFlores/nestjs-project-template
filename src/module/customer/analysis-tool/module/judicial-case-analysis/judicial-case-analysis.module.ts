import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { JudicialCaseAnalysisController } from '@module/customer/analysis-tool/module/judicial-case-analysis/judicial-case-analysis.controller';
import { CreateJudicialCaseAnalysisResultUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/create-judicial-case-analysis-result.use-case';
import { CreateJudicialCaseAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/create-judicial-case-analysis.use-case';
import { DeleteJudicialCaseAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/delete-judicial-case-analysis.use-case';
import { DownloadJudicialCaseAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/download-judicial-case-analysis-complete-analysis.use-case';
import { DownloadJudicialCaseAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/download-judicial-case-analysis-simplified-analysis.use-case';
import { GetJudicialCaseAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/get-judicial-case-analysis.use-case';
import { UpdateJudicialCaseAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/update-judicial-case-analysis.use-case';
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
  controllers: [JudicialCaseAnalysisController],
  providers: [
    CreateJudicialCaseAnalysisUseCase,
    CreateJudicialCaseAnalysisResultUseCase,
    GetJudicialCaseAnalysisUseCase,
    DeleteJudicialCaseAnalysisUseCase,
    DownloadJudicialCaseAnalysisCompleteAnalysisUseCase,
    DownloadJudicialCaseAnalysisSimplifiedAnalysisUseCase,
    UpdateJudicialCaseAnalysisUseCase,
  ],
  exports: [DeleteJudicialCaseAnalysisUseCase],
})
export class JudicialCaseAnalysisModule {
  protected readonly _type = JudicialCaseAnalysisModule.name;
}
