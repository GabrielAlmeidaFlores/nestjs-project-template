import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';
import type { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import type { RuralTimelineCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/enum/rural-timeline-cnis-contribution-period-status.enum';
import type { RuralTimelineCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/value-object/rural-timeline-cnis-contribution-period-id/rural-timeline-cnis-contribution-period-id.value-object';

export interface RuralTimelineCnisContributionPeriodEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineCnisContributionPeriodId> {
  ruralTimelineId?: RuralTimelineId | null;
  employmentRelationshipSource?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
  qualifyingPeriod?: number | null;
  status?: RuralTimelineCnisContributionPeriodStatusEnum | null;
  averageContributionAmount?: number | null;
  contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;
  externalSupplementationIntent: boolean;
}
