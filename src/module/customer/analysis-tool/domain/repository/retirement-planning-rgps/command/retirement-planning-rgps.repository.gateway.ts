import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';

export abstract class RetirementPlanningRgpsCommandRepositoryGateway {
  public abstract createRetirementPlanningRgps(
    props: RetirementPlanningRgpsEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRgps(
    id: RetirementPlanningRgpsId,
    props: RetirementPlanningRgpsEntity,
  ): TransactionType;
}
