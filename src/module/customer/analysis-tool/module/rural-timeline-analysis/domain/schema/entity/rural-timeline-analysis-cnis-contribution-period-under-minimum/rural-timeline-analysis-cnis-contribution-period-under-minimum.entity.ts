import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/value-object/rural-timeline-analysis-cnis-contribution-period-under-minimum-id/rural-timeline-analysis-cnis-contribution-period-under-minimum-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId> {
  @Description('Data da contribuição.')
  public readonly contributionDate: Date;

  @Description('Valor da contribuição.')
  public readonly contributionAmount: DecimalValue;

  @Description('ID do período de contribuição CNIS associado.')
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId, props);

    this.contributionDate = props.contributionDate;
    this.contributionAmount = props.contributionAmount;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
