import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/value-object/disability-retirement-planning-rejection-period-earnings-history-id/disability-retirement-planning-rejection-period-earnings-history-id.value-object';

import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity.props.interface';

export class DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity extends BaseEntity<DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly value: string | null;
  public readonly disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId;

  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.value = props.value ?? null;
    this.disabilityRetirementPlanningRejectionPeriodId =
      props.disabilityRetirementPlanningRejectionPeriodId;
  }
}
