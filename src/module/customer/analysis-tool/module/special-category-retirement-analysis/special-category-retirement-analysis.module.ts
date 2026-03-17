import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { MarkdownConverterModule } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { SpecialCategoryRetirementAnalysisController } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/special-category-retirement-analysis.controller';
import { AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/add-special-category-retirement-analysis-period-document.use-case';
import { AnalyzeSpecialCategoryRetirementAdministrativeProcedureUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/analyze-special-category-retirement-administrative-procedure.use-case';
import { CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-remuneration-batch.use-case';
import { CreateSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-remuneration.use-case';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-work-period-batch.use-case';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-work-period.use-case';
import { CreateSpecialCategoryRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis.use-case';
import { DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis-period-document.use-case';
import { DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis-remuneration.use-case';
import { DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis-work-period.use-case';
import { DeleteSpecialCategoryRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis.use-case';
import { DownloadSpecialCategoryRetirementAnalysisFullDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/download-special-category-retirement-analysis-full-document.use-case';
import { DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/download-special-category-retirement-analysis-simplified-document.use-case';
import { GenerateSpecialCategoryRetirementAnalysisConversionUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/generate-special-category-retirement-analysis-conversion.use-case';
import { GenerateSpecialCategoryRetirementAnalysisFullTextUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/generate-special-category-retirement-analysis-full-text.use-case';
import { GenerateSpecialCategoryRetirementAnalysisRulesUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/generate-special-category-retirement-analysis-rules.use-case';
import { GetSpecialCategoryRetirementAnalysisByIdUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/get-special-category-retirement-analysis-by-id.use-case';
import { GetSpecialCategoryRetirementAnalysisTimelineUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/get-special-category-retirement-analysis-timeline.use-case';
import { ListSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/list-special-category-retirement-analysis-remuneration.use-case';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-remuneration-batch.use-case';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-work-period-batch.use-case';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-remuneration.use-case';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-work-period.use-case';
import { UpdateSpecialCategoryRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AnalysisProcessorModule,
    AuthModule,
    BucketModule,
    DatabaseModule,
    ExportDocumentModule,
    FileProcessorModule,
    GenerativeIaModule,
    MarkdownConverterModule,
    OrganizationCreditModule,
    OrganizationSessionModule,
    PaymentPlanModule,
  ],
  controllers: [SpecialCategoryRetirementAnalysisController],
  providers: [
    CreateSpecialCategoryRetirementAnalysisUseCase,
    GetSpecialCategoryRetirementAnalysisByIdUseCase,
    UpdateSpecialCategoryRetirementAnalysisUseCase,
    DeleteSpecialCategoryRetirementAnalysisUseCase,
    CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase,
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    GetSpecialCategoryRetirementAnalysisTimelineUseCase,
    ListSpecialCategoryRetirementAnalysisRemunerationUseCase,
    CreateSpecialCategoryRetirementAnalysisRemunerationUseCase,
    UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase,
    DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase,
    CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase,
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase,
    UpdateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase,
    GenerateSpecialCategoryRetirementAnalysisFullTextUseCase,
    GenerateSpecialCategoryRetirementAnalysisConversionUseCase,
    GenerateSpecialCategoryRetirementAnalysisRulesUseCase,
    DownloadSpecialCategoryRetirementAnalysisFullDocumentUseCase,
    DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase,
    AnalyzeSpecialCategoryRetirementAdministrativeProcedureUseCase,
  ],
  exports: [
    CreateSpecialCategoryRetirementAnalysisUseCase,
    GetSpecialCategoryRetirementAnalysisByIdUseCase,
    UpdateSpecialCategoryRetirementAnalysisUseCase,
    DeleteSpecialCategoryRetirementAnalysisUseCase,
    CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase,
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    GetSpecialCategoryRetirementAnalysisTimelineUseCase,
    ListSpecialCategoryRetirementAnalysisRemunerationUseCase,
    CreateSpecialCategoryRetirementAnalysisRemunerationUseCase,
    UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase,
    DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase,
    CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase,
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase,
    UpdateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase,
    GenerateSpecialCategoryRetirementAnalysisFullTextUseCase,
    GenerateSpecialCategoryRetirementAnalysisConversionUseCase,
    GenerateSpecialCategoryRetirementAnalysisRulesUseCase,
    DownloadSpecialCategoryRetirementAnalysisFullDocumentUseCase,
    DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase,
    AnalyzeSpecialCategoryRetirementAdministrativeProcedureUseCase,
  ],
})
export class SpecialCategoryRetirementAnalysisModule {
  protected readonly _type = SpecialCategoryRetirementAnalysisModule.name;
}
