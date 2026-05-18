import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

export abstract class DisabilityRetirementPlanningRejectionCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejection(
    props: DisabilityRetirementPlanningRejectionEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningRejection(
    id: DisabilityRetirementPlanningRejectionId,
    props: DisabilityRetirementPlanningRejectionEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningRejectionResultId(
    id: DisabilityRetirementPlanningRejectionId,
    resultId: DisabilityRetirementPlanningRejectionResultId,
  ): TransactionType;
}
