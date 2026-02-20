import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/rural-timeline-analysis-cnis-contribution-period-late-contribution.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodLateContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/value-object/rural-timeline-analysis-cnis-contribution-period-late-contribution-id/rural-timeline-analysis-cnis-contribution-period-late-contribution-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodLateContributionId> {
  @Description(
    'Data original em que a contribuição deveria ter sido paga conforme o vínculo empregatício.',
  )
  public readonly originalContributionDate: Date;

  @Description(
    'Data real em que a contribuição em atraso foi efetivamente paga ao INSS.',
  )
  public readonly actualPaymentDate: Date;

  @Description(
    'Análise gerada por IA sobre o impacto da contribuição em atraso no benefício previdenciário.',
  )
  public readonly impactAnalysis: string | null;

  @Description('Data e hora em que a análise de impacto foi realizada pela IA.')
  public readonly analyzedAt: Date | null;

  @Description(
    'Período de contribuição CNIS ao qual esta contribuição em atraso pertence.',
  )
  public readonly ruralTimelineAnalysisCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodLateContributionEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodLateContributionId, props);

    this.originalContributionDate = props.originalContributionDate;
    this.actualPaymentDate = props.actualPaymentDate;
    this.impactAnalysis = props.impactAnalysis ?? null;
    this.analyzedAt = props.analyzedAt ?? null;
    this.ruralTimelineAnalysisCnisContributionPeriodId =
      props.ruralTimelineAnalysisCnisContributionPeriodId;
  }
}
