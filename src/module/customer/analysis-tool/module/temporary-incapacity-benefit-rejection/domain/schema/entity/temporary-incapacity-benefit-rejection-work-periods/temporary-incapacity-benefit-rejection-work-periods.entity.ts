import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/temporary-incapacity-benefit-rejection-work-periods.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionWorkPeriodsEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionWorkPeriodsId> {
  public readonly bondOrigin: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: TemporaryIncapacityBenefitRejectionCategoryEnum;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly status: boolean;
  public readonly gracePeriod: number;
  public readonly temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionWorkPeriodsEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionWorkPeriodsId, props);
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
    this.temporaryIncapacityBenefitRejectionId =
      props.temporaryIncapacityBenefitRejectionId;
  }
}
