import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import type { RetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/value-object/retirement-planning-rpps-result-id.value-object';

export abstract class RetirementPlanningRppsResultCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsResult(
    props: RetirementPlanningRppsResultEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRppsResult(
    id: RetirementPlanningRppsResultId,
    props: RetirementPlanningRppsResultEntity,
  ): TransactionType;
}
