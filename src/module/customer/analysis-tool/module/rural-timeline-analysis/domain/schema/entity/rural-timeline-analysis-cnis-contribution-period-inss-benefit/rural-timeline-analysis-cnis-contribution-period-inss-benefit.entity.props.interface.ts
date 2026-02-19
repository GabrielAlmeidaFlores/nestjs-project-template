import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-inss-benefit/value-object/rural-timeline-analysis-cnis-contribution-period-inss-benefit-id/rural-timeline-analysis-cnis-contribution-period-inss-benefit-id.value-object';

export interface RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisCnisContributionPeriodInssBenefitId> {
  readonly inssBenefitNumber: string;
  readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;
}
