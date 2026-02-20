import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/rural-timeline-analysis-cnis-contribution-period-missing-end-date.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/value-object/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId> {
  @Description(
    'Data de saída faltante que precisa ser registrada para complementar o período de contribuição.',
  )
  public readonly missingEndDate: Date;

  @Description(
    'Valor real da remuneração na data de saída faltante, usado para cálculos de contribuição.',
  )
  public readonly actualRemunerationAmount: DecimalValue;

  @Description(
    'Período de contribuição CNIS ao qual esta pendência de data de saída pertence.',
  )
  public readonly ruralTimelineAnalysisCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId, props);

    this.missingEndDate = props.missingEndDate;
    this.actualRemunerationAmount = props.actualRemunerationAmount;
    this.ruralTimelineAnalysisCnisContributionPeriodId =
      props.ruralTimelineAnalysisCnisContributionPeriodId;
  }
}
