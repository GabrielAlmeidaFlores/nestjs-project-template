import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import type { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

export abstract class DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejectionResult(
    props: DisabilityRetirementPlanningRejectionResultEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningRejectionResult(
    id: DisabilityRetirementPlanningRejectionResultId,
    props: DisabilityRetirementPlanningRejectionResultEntity,
  ): TransactionType;
}
