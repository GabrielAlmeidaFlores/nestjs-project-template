import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';

import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodActivityTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-activity-type.enum';
import type { SpecialRetirementRejectionWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-category.enum';
import type { SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-period-consideration.enum';
import type { SpecialRetirementRejectionWorkPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/special-retirement-rejection-work-period.entity.props.interface';

export class SpecialRetirementRejectionWorkPeriodEntity extends BaseEntity<SpecialRetirementRejectionWorkPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: SpecialRetirementRejectionWorkPeriodCategoryEnum | null;
  public readonly pendencyReason: string[] | null;
  public readonly periodConsideration: SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum | null;
  public readonly contributionAverage: string | null;
  public readonly status: string | null;
  public readonly gracePeriod: string | null;
  public readonly activityType: SpecialRetirementRejectionWorkPeriodActivityTypeEnum | null;
  public readonly specialRetirementRejectionId: SpecialRetirementRejectionId | null;

  protected readonly _type = SpecialRetirementRejectionWorkPeriodEntity.name;

  public constructor(
    props: SpecialRetirementRejectionWorkPeriodEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionWorkPeriodId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.status = props.status ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.activityType = props.activityType ?? null;
    this.specialRetirementRejectionId =
      props.specialRetirementRejectionId ?? null;
  }
}
