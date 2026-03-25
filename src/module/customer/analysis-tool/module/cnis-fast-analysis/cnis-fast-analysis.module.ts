import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { CnisFastAnalysisController } from '@module/customer/analysis-tool/module/cnis-fast-analysis/cnis-fast-analysis.controller';
import { CnisFastAnalysisTemplateService } from '@module/customer/analysis-tool/module/cnis-fast-analysis/service/cnis-fast-analysis-template.service';
import { AnalyzeCnisDocumentUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/analyze-cnis-document.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/delete-cnis-fast-analysis.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/download-cnis-simplified-analysis.use-case';
import { ExtractClientFromCnisAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/extract-client-from-cnis-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/get-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/update-cnis-fast-analysis.use-case';
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
    AnalysisProcessorModule,
    AnalysisActivityTrackerModule,
    ExportDocumentModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
  ],
  controllers: [CnisFastAnalysisController],
  providers: [
    CnisFastAnalysisTemplateService,
    AnalyzeCnisDocumentUseCase,
    CreateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    DeleteCnisFastAnalysisUseCase,
    DownloadCnisCompleteAnalysisUseCase,
    DownloadCnisSimplifiedAnalysisUseCase,
    UpdateCnisFastAnalysisUseCase,
    ExtractClientFromCnisAnalysisUseCase,
  ],
  exports: [DeleteCnisFastAnalysisUseCase],
})
export class CnisFastAnalysisModule {
  protected readonly _type = CnisFastAnalysisModule.name;
}
