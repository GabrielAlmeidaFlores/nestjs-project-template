import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsRemunerationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.entity';
import type { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';

export abstract class RetirementPlanningRppsRemunerationCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsRemuneration(
    props: RetirementPlanningRppsRemunerationEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRppsRemuneration(
    id: RetirementPlanningRppsRemunerationId,
    props: RetirementPlanningRppsRemunerationEntity,
  ): TransactionType;
}
