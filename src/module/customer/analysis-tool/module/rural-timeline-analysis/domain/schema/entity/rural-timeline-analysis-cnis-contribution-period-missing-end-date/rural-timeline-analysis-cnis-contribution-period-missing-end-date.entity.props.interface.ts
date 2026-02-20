import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/value-object/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id.value-object';

export interface RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId> {
  missingEndDate: Date;
  actualRemunerationAmount: DecimalValue;
  ruralTimelineAnalysisCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;
}
