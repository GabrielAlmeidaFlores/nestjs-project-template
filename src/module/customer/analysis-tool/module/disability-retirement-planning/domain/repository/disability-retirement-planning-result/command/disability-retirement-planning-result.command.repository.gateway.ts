import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import { DisabilityRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/disability-retirement-planning-result.entity';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';

export abstract class DisabilityRetirementPlanningResultCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningResult(
    props: DisabilityRetirementPlanningResultEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningResult(
    id: DisabilityRetirementPlanningResultId,
    props: DisabilityRetirementPlanningResultEntity,
  ): TransactionType;
}
