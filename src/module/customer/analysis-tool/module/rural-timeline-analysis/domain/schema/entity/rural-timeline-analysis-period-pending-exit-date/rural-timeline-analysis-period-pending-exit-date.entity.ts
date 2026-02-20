import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisPeriodPendingExitDateEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity.props.interface';
import { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisPeriodPendingExitDateEntity extends BaseEntity<RuralTimelineAnalysisPeriodPendingExitDateId> {
  @Description(
    'Data específica de uma pendência sem data de saída no período rural.',
  )
  public readonly pendingDate: Date;

  @Description('Valor decimal associado à pendência sem data de saída.')
  public readonly pendingAmount: DecimalValue;

  @Description('Período de contribuição CNIS ao qual esta pendência pertence.')
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisPeriodPendingExitDateEntity.name;

  public constructor(
    props: RuralTimelineAnalysisPeriodPendingExitDateEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisPeriodPendingExitDateId, props);

    this.pendingDate = props.pendingDate;
    this.pendingAmount = props.pendingAmount;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
