import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-legal-proceeding/rural-timeline-analysis-cnis-contribution-period-legal-proceeding.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-legal-proceeding/value-object/rural-timeline-analysis-cnis-contribution-period-legal-proceeding-id/rural-timeline-analysis-cnis-contribution-period-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodLegalProceedingId> {
  @Description(
    'Número do processo judicial associado ao período de contribuição CNIS.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Período de contribuição CNIS ao qual este processo judicial pertence.',
  )
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodLegalProceedingEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
