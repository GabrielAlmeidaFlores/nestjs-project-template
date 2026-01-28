import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineCnisContributionPeriodUnderMinimumEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/rural-timeline-cnis-contribution-period-under-minimum.entity.props.interface';
import { RuralTimelineCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/value-object/rural-timeline-cnis-contribution-period-under-minimum-id/rural-timeline-cnis-contribution-period-under-minimum-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/value-object/rural-timeline-cnis-contribution-period-id/rural-timeline-cnis-contribution-period-id.value-object';

export class RuralTimelineCnisContributionPeriodUnderMinimumEntity extends BaseEntity<RuralTimelineCnisContributionPeriodUnderMinimumId> {
  @Description('Data da contribuição.')
  public readonly contributionDate: Date;

  @Description('Valor da contribuição.')
  public readonly contributionAmount: DecimalValue;

  @Description('ID do período de contribuição CNIS associado.')
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineCnisContributionPeriodUnderMinimumEntity.name;

  public constructor(
    props: RuralTimelineCnisContributionPeriodUnderMinimumEntityPropsInterface,
  ) {
    super(RuralTimelineCnisContributionPeriodUnderMinimumId, props);

    this.contributionDate = props.contributionDate;
    this.contributionAmount = props.contributionAmount;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
