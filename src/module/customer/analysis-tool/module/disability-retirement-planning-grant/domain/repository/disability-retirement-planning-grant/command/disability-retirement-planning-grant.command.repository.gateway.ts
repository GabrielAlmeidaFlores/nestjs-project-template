import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

export abstract class DisabilityRetirementPlanningGrantCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrant(
    props: DisabilityRetirementPlanningGrantEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningGrant(
    id: DisabilityRetirementPlanningGrantId,
    props: DisabilityRetirementPlanningGrantEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningGrantResultId(
    id: DisabilityRetirementPlanningGrantId,
    resultId: DisabilityRetirementPlanningGrantResultId,
  ): TransactionType;
}
