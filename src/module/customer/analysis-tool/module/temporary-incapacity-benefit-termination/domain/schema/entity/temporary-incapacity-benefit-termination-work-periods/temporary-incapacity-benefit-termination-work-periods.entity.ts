import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-period-consideration.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/temporary-incapacity-benefit-termination-work-periods.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationWorkPeriodsEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationWorkPeriodsId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: TemporaryIncapacityBenefitTerminationCategoryEnum | null;
  public readonly activityDescription: string | null;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly impactMonths: number | null;
  public readonly gracePeriod: number | null;
  public readonly isPendency: boolean;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly status: boolean;
  public readonly temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationWorkPeriodsEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationWorkPeriodsId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.impactMonths = props.impactMonths ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.isPendency = props.isPendency;
    this.wantsToComplementViaMeuINSS =
      props.wantsToComplementViaMeuINSS ?? null;
    this.status = props.status;
    this.temporaryIncapacityBenefitTerminationId =
      props.temporaryIncapacityBenefitTerminationId;
  }
}
