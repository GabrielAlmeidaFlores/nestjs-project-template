import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/permanent-incapacity-benefit-terminated-work-periods.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedWorkPeriodsEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedWorkPeriodsId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: PermanentIncapacityBenefitTerminatedCategoryEnum | null;
  public readonly activityDescription: string | null;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly impactMonths: number | null;
  public readonly gracePeriod: number | null;
  public readonly isPendency: boolean;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly status: boolean;
  public readonly permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedWorkPeriodsEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedWorkPeriodsId, props);
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
    this.permanentIncapacityBenefitTerminatedId =
      props.permanentIncapacityBenefitTerminatedId;
  }
}
