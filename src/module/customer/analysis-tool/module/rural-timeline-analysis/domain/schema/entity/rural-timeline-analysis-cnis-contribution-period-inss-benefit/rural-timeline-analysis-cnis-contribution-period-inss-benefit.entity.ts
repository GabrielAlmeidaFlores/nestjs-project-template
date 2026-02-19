import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-inss-benefit/rural-timeline-analysis-cnis-contribution-period-inss-benefit.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-inss-benefit/value-object/rural-timeline-analysis-cnis-contribution-period-inss-benefit-id/rural-timeline-analysis-cnis-contribution-period-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodInssBenefitId> {
  @Description(
    'Número do benefício INSS associado ao período de contribuição CNIS.',
  )
  public readonly inssBenefitNumber: string;

  @Description(
    'Período de contribuição CNIS ao qual este benefício INSS pertence.',
  )
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
