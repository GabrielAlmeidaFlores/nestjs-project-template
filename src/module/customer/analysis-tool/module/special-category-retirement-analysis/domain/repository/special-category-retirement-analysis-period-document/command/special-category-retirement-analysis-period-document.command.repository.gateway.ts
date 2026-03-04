import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialCategoryRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.entity';
import type { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

export abstract class SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway {
  public abstract createSpecialCategoryRetirementAnalysisPeriodDocument(
    props: SpecialCategoryRetirementAnalysisPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteSpecialCategoryRetirementAnalysisPeriodDocument(
    id: SpecialCategoryRetirementAnalysisPeriodDocumentId,
  ): TransactionType;

  public abstract deleteAllByWorkPeriodId(
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): TransactionType;
}
