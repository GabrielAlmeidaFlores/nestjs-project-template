import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/value-object/rural-timeline-analysis-cnis-contribution-period-adjustment-id/rural-timeline-analysis-cnis-contribution-period-adjustment-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodAdjustmentId> {
  @Description('Observação técnica gerada pela IA justificando o ajuste.')
  public readonly technicalObservation: string;

  @Description('Anos de tempo de contribuição ganhos com o ajuste.')
  public readonly contributionTimeGainedYears: number;

  @Description('Meses de tempo de contribuição ganhos com o ajuste.')
  public readonly contributionTimeGainedMonths: number;

  @Description('Dias de tempo de contribuição ganhos com o ajuste.')
  public readonly contributionTimeGainedDays: number;

  @Description('Data de início do período convencional utilizado no ajuste.')
  public readonly conventionalPeriodStartDate: Date;

  @Description('Data de término do período convencional utilizado no ajuste.')
  public readonly conventionalPeriodEndDate: Date;

  @Description('Período de contribuição CNIS ao qual este ajuste pertence.')
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodAdjustmentId, props);

    this.technicalObservation = props.technicalObservation;
    this.contributionTimeGainedYears = props.contributionTimeGainedYears;
    this.contributionTimeGainedMonths = props.contributionTimeGainedMonths;
    this.contributionTimeGainedDays = props.contributionTimeGainedDays;
    this.conventionalPeriodStartDate = props.conventionalPeriodStartDate;
    this.conventionalPeriodEndDate = props.conventionalPeriodEndDate;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
