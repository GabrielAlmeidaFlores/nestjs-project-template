import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsAnalysisResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.entity';
import type { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';

export abstract class RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsAnalysisResult(
    props: RetirementPlanningRgpsAnalysisResultEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRgpsAnalysisResult(
    id: RetirementPlanningRgpsAnalysisResultId,
    props: RetirementPlanningRgpsAnalysisResultEntity,
  ): TransactionType;
}
