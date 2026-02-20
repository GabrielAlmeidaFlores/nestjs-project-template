import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { CnisFastAnalysisTemplateService } from '@module/customer/analysis-tool/module/cnis-fast-analysis/service/cnis-fast-analysis-template.service';
import { LegalPleadingController } from '@module/customer/analysis-tool/module/legal-pleading/legal-pleading.controller';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/create-legal-pleading.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/delete-legal-pleading.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetLegalPleadingStatisticsUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/get-legal-pleading-statistics.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/get-legal-pleading.use-case';
import { ListLegalPleadingHistoryUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/list-legal-pleading-history.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/list-legal-pleading.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/update-legal-pleading-complete-analysis.use-case';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/update-legal-pleading-status-to-complete.use-case';
import { UpdateLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/update-legal-pleading.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
    DatabaseModule,
    ExportDocumentModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    OrganizationCreditModule,
    OrganizationSessionModule,
    PaymentPlanModule,
  ],
  controllers: [LegalPleadingController],
  providers: [
    CnisFastAnalysisTemplateService,
    CreateLegalPleadingUseCase,
    UpdateLegalPleadingUseCase,
    CreateLegalPleadingResultUseCase,
    GetLegalPleadingUseCase,
    ListLegalPleadingUseCase,
    CreateLegalPleadingDocumentAnalysisUseCase,
    DownloadLegalPleadingSimplifiedAnalysisUseCase,
    DownloadLegalPleadingCompleteAnalysisUseCase,
    UpdateLegalPleadingCompleteAnalysisUseCase,
    UpdateLegalPleadingStatusToCompleteUseCase,
    GetLegalPleadingStatisticsUseCase,
    DeleteLegalPleadingUseCase,
    ListLegalPleadingHistoryUseCase,
  ],
  exports: [DeleteLegalPleadingUseCase],
})
export class LegalPleadingModule {
  protected readonly _type = LegalPleadingModule.name;
}
