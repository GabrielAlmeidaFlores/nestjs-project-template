import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import type { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';

export abstract class RetirementPlanningRgpsResultCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsResult(
    props: RetirementPlanningRgpsResultEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRgpsResult(
    id: RetirementPlanningRgpsResultId,
    props: RetirementPlanningRgpsResultEntity,
  ): TransactionType;
}
