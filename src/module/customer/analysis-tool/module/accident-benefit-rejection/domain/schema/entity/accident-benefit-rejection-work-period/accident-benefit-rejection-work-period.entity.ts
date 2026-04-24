import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';

import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity.props.interface';
import type { AccidentBenefitRejectionWorkPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-consideration.enum';
import type { AccidentBenefitRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-job-type.enum';

export class AccidentBenefitRejectionWorkPeriodEntity extends BaseEntity<AccidentBenefitRejectionWorkPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly pendencyReason: string | null;
  public readonly periodConsideration: AccidentBenefitRejectionWorkPeriodConsiderationEnum | null;
  public readonly contributionAverage: string | null;
  public readonly status: string | null;
  public readonly gracePeriod: string | null;
  public readonly jobType: AccidentBenefitRejectionWorkPeriodJobTypeEnum | null;
  public readonly activityDescription: string | null;
  public readonly accidentBenefitRejectionId: AccidentBenefitRejectionId | null;

  protected readonly _type = AccidentBenefitRejectionWorkPeriodEntity.name;

  public constructor(
    props: AccidentBenefitRejectionWorkPeriodEntityPropsInterface,
  ) {
    super(AccidentBenefitRejectionWorkPeriodId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.status = props.status ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.jobType = props.jobType ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.accidentBenefitRejectionId = props.accidentBenefitRejectionId ?? null;
  }
}
