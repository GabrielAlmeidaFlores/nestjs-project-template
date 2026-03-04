import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { SpecialCategoryRetirementAnalysisController } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/special-category-retirement-analysis.controller';
import { AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/add-special-category-retirement-analysis-period-document.use-case';
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
import { UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-remuneration.use-case';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-work-period.use-case';
import { UpdateSpecialCategoryRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [DatabaseModule, AuthModule, OrganizationSessionModule],
  controllers: [SpecialCategoryRetirementAnalysisController],
  providers: [
    CreateSpecialCategoryRetirementAnalysisUseCase,
    GetSpecialCategoryRetirementAnalysisByIdUseCase,
    UpdateSpecialCategoryRetirementAnalysisUseCase,
    DeleteSpecialCategoryRetirementAnalysisUseCase,
    CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    GetSpecialCategoryRetirementAnalysisTimelineUseCase,
    ListSpecialCategoryRetirementAnalysisRemunerationUseCase,
    UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase,
    DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase,
    GenerateSpecialCategoryRetirementAnalysisFullTextUseCase,
    GenerateSpecialCategoryRetirementAnalysisConversionUseCase,
    GenerateSpecialCategoryRetirementAnalysisRulesUseCase,
    DownloadSpecialCategoryRetirementAnalysisFullDocumentUseCase,
    DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase,
  ],
  exports: [
    CreateSpecialCategoryRetirementAnalysisUseCase,
    GetSpecialCategoryRetirementAnalysisByIdUseCase,
    UpdateSpecialCategoryRetirementAnalysisUseCase,
    DeleteSpecialCategoryRetirementAnalysisUseCase,
    CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    GetSpecialCategoryRetirementAnalysisTimelineUseCase,
    ListSpecialCategoryRetirementAnalysisRemunerationUseCase,
    UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase,
    DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase,
    GenerateSpecialCategoryRetirementAnalysisFullTextUseCase,
    GenerateSpecialCategoryRetirementAnalysisConversionUseCase,
    GenerateSpecialCategoryRetirementAnalysisRulesUseCase,
    DownloadSpecialCategoryRetirementAnalysisFullDocumentUseCase,
    DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase,
  ],
})
export class SpecialCategoryRetirementAnalysisModule {
  protected readonly _type = SpecialCategoryRetirementAnalysisModule.name;
}
