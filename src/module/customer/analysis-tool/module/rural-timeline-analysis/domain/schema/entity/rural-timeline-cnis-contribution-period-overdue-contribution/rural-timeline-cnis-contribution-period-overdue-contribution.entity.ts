import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity.props.interface';
import { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineCnisContributionPeriodOverdueContributionEntity extends BaseEntity<RuralTimelineCnisContributionPeriodOverdueContributionId> {
  @Description('Data de vencimento da contribuição em atraso.')
  public readonly overdueDate: Date;

  @Description(
    'Data em que a contribuição em atraso foi recolhida. Null se ainda não foi paga.',
  )
  public readonly paymentDate: Date | null;

  @Description(
    'Período de contribuição CNIS ao qual esta contribuição em atraso pertence.',
  )
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineCnisContributionPeriodOverdueContributionEntity.name;

  public constructor(
    props: RuralTimelineCnisContributionPeriodOverdueContributionEntityPropsInterface,
  ) {
    super(RuralTimelineCnisContributionPeriodOverdueContributionId, props);

    this.overdueDate = props.overdueDate;
    this.paymentDate = props.paymentDate ?? null;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
