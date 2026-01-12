import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { PaymentPlanModule } from '@module/admin/payment-plan/payment-plan.module';
import { FileProcessorModule } from '@module/customer/account/lib/file-processor/file-processor.module';
import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { CnisFastAnalysisController } from '@module/customer/analysis-tool/module/cnis-fast-analysis/cnis-fast-analysis.controller';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/delete-cnis-fast-analysis.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/download-cnis-simplified-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/get-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/update-cnis-fast-analysis.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    RemunerationCalculatorModule,
    CnisAnalyzerModule,
    GenerativeIaModule,
  ],
  controllers: [CnisFastAnalysisController],
  providers: [
    CreateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    DeleteCnisFastAnalysisUseCase,
    DownloadCnisCompleteAnalysisUseCase,
    DownloadCnisSimplifiedAnalysisUseCase,
    UpdateCnisFastAnalysisUseCase,
  ],
  exports: [
    CreateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    DeleteCnisFastAnalysisUseCase,
    DownloadCnisCompleteAnalysisUseCase,
    DownloadCnisSimplifiedAnalysisUseCase,
    UpdateCnisFastAnalysisUseCase,
  ],
})
export class CnisFastAnalysisModule {
  protected readonly _type = CnisFastAnalysisModule.name;
}
