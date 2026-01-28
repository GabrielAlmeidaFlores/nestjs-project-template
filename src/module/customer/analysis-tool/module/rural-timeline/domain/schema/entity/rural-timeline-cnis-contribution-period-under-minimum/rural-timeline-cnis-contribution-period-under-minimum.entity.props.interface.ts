import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RuralTimelineCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/value-object/rural-timeline-cnis-contribution-period-id/rural-timeline-cnis-contribution-period-id.value-object';
import type { RuralTimelineCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/value-object/rural-timeline-cnis-contribution-period-under-minimum-id/rural-timeline-cnis-contribution-period-under-minimum-id.value-object';

export interface RuralTimelineCnisContributionPeriodUnderMinimumEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineCnisContributionPeriodUnderMinimumId> {
  contributionDate: Date;
  contributionAmount: DecimalValue;
  ruralTimelineCnisContributionPeriodId: RuralTimelineCnisContributionPeriodId;
}
