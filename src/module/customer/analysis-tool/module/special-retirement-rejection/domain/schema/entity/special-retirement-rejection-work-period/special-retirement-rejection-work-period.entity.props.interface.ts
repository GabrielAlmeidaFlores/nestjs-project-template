import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodActivityTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-activity-type.enum';
import type { SpecialRetirementRejectionWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-category.enum';
import type { SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-period-consideration.enum';
import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';

export interface SpecialRetirementRejectionWorkPeriodEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionWorkPeriodId> {
  bondOrigin?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: SpecialRetirementRejectionWorkPeriodCategoryEnum | null;
  pendencyReason?: string[] | null;
  periodConsideration?: SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum | null;
  contributionAverage?: string | null;
  status?: string | null;
  gracePeriod?: string | null;
  activityType?: SpecialRetirementRejectionWorkPeriodActivityTypeEnum | null;
  specialRetirementRejectionId?: SpecialRetirementRejectionId | null;
}
