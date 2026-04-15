import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/enum/rural-or-hybrid-retirement-rejection-work-period-job-type.enum';
import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';

export interface RuralOrHybridRetirementRejectionWorkPeriodEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionWorkPeriodId> {
  bondOrigin?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  pendencyReason?: string | null;
  periodConsideration?: string | null;
  contributionAverage?: string | null;
  status?: string | null;
  gracePeriod?: string | null;
  jobType?: RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum | null;
  activityDescription?: string | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
