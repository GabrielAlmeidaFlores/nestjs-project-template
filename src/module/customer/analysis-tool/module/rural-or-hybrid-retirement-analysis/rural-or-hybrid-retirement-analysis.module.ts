import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RuralOrHybridRetirementAnalysisController } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.controller';
import { AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/analyze-rural-or-hybrid-retirement-analysis-time-accelerator.use-case';
import { AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/analyze-rural-or-hybrid-retirement-analysis-work-period-documents.use-case';
import { CreateRuralOrHybridRetirementAnalysisFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-first-analysis.use-case';
import { CreateRuralOrHybridRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-period.use-case';
import { CreateRuralOrHybridRetirementAnalysisResultUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-result.use-case';
import { CreateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-testimonial-witness.use-case';
import { CreateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-time-accelerator.use-case';
import { CreateRuralOrHybridRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-work-period.use-case';
import { CreateRuralOrHybridRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis.use-case';
import { DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/download-rural-or-hybrid-retirement-analysis-complete-analysis.use-case';
import { DownloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/download-rural-or-hybrid-retirement-analysis-simplified-analysis.use-case';
import { GetRuralOrHybridRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/get-rural-or-hybrid-retirement-analysis.use-case';
import { UpdateRuralOrHybridRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-period.use-case';
import { UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-testimonial-witness.use-case';
import { UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-time-accelerator.use-case';
import { UpdateRuralOrHybridRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-work-period.use-case';
import { UpdateRuralOrHybridRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    OrganizationSessionModule,
    DatabaseModule,
    CnisAnalyzerModule,
    AnalysisProcessorModule,
    FileProcessorModule,
    ExportDocumentModule,
    OrganizationCreditModule,
    PaymentPlanModule,
  ],
  controllers: [RuralOrHybridRetirementAnalysisController],
  providers: [
    CreateRuralOrHybridRetirementAnalysisUseCase,
    UpdateRuralOrHybridRetirementAnalysisUseCase,
    GetRuralOrHybridRetirementAnalysisUseCase,
    CreateRuralOrHybridRetirementAnalysisFirstAnalysisUseCase,
    CreateRuralOrHybridRetirementAnalysisResultUseCase,
    CreateRuralOrHybridRetirementAnalysisPeriodUseCase,
    UpdateRuralOrHybridRetirementAnalysisPeriodUseCase,
    CreateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase,
    UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase,
    CreateRuralOrHybridRetirementAnalysisWorkPeriodUseCase,
    UpdateRuralOrHybridRetirementAnalysisWorkPeriodUseCase,
    AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase,
    CreateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase,
    UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase,
    AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase,
    DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase,
    DownloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase,
  ],
})
export class RuralOrHybridRetirementAnalysisModule {
  protected readonly _type = RuralOrHybridRetirementAnalysisModule.name;
}
