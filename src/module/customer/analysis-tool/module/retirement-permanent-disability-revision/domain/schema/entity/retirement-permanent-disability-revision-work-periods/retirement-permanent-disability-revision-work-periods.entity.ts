import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-pendency-reason.enum';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/retirement-permanent-disability-revision-work-periods.entity.props.interface';

export class RetirementPermanentDisabilityRevisionWorkPeriodsEntity extends BaseEntity<RetirementPermanentDisabilityRevisionWorkPeriodsId> {
  public readonly bondOrigin: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: string;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly status: boolean;
  public readonly gracePeriod: number;
  public readonly retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRevisionWorkPeriodsId, props);
    this.bondOrigin = props.bondOrigin;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.category = props.category;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.status = props.status;
    this.gracePeriod = props.gracePeriod;
    this.retirementPermanentDisabilityRevisionId =
      props.retirementPermanentDisabilityRevisionId;
  }
}
