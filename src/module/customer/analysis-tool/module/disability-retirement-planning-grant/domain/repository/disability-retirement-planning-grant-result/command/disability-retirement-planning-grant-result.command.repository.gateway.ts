import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import type { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

export abstract class DisabilityRetirementPlanningGrantResultCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantResult(
    props: DisabilityRetirementPlanningGrantResultEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningGrantResult(
    id: DisabilityRetirementPlanningGrantResultId,
    props: DisabilityRetirementPlanningGrantResultEntity,
  ): TransactionType;
}
