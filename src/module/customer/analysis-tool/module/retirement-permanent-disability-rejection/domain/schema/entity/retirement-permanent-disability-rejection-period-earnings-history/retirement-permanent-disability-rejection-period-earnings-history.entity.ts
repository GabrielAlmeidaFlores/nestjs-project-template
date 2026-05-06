import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/value-object/retirement-permanent-disability-rejection-period-earnings-history-id/retirement-permanent-disability-rejection-period-earnings-history-id.value-object';

import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity.props.interface';

export class RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity extends BaseEntity<RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly value: string | null;
  public readonly retirementPermanentDisabilityRejectionPeriodId: RetirementPermanentDisabilityRejectionPeriodId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.value = props.value ?? null;
    this.retirementPermanentDisabilityRejectionPeriodId =
      props.retirementPermanentDisabilityRejectionPeriodId;
  }
}
