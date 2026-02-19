import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-legal-proceeding/value-object/rural-timeline-analysis-cnis-contribution-period-legal-proceeding-id/rural-timeline-analysis-cnis-contribution-period-legal-proceeding-id.value-object';

export interface RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisCnisContributionPeriodLegalProceedingId> {
  readonly legalProceedingNumber: string;
  readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;
}
