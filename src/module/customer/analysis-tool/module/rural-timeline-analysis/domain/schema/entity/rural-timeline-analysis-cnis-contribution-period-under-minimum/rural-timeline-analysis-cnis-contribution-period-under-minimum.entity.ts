import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/value-object/rural-timeline-analysis-cnis-contribution-period-under-minimum-id/rural-timeline-analysis-cnis-contribution-period-under-minimum-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId> {
  @Description(
    'Data específica em que foi realizada uma contribuição abaixo do valor mínimo previdenciário.',
  )
  public readonly contributionDate: Date;

  @Description(
    'Valor da contribuição previdenciária que ficou abaixo do salário mínimo exigido.',
  )
  public readonly contributionAmount: DecimalValue;

  @Description(
    'Período de contribuição CNIS ao qual esta contribuição insuficiente pertence.',
  )
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
