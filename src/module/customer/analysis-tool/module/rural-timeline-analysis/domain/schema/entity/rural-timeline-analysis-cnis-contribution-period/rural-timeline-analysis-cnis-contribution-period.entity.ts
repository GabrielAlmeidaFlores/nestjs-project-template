import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisCnisContributionPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity.props.interface';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export class RuralTimelineAnalysisCnisContributionPeriodEntity extends BaseEntity<RuralTimelineAnalysisCnisContributionPeriodId> {
  @Description('ID da linha do tempo rural associada.')
  public readonly ruralTimelineId: RuralTimelineAnalysisId | null;

  @Description('Fonte da relação de emprego.')
  public readonly employmentRelationshipSource: string | null;

  @Description('Data de início do período de contribuição.')
  public readonly startDate: Date | null;

  @Description('Data de término do período de contribuição.')
  public readonly endDate: Date | null;

  @Description('Categoria do período de contribuição.')
  public readonly category: string | null;

  @Description('Período de carência.')
  public readonly qualifyingPeriod: number | null;

  @Description('Status do período de contribuição.')
  public readonly status: RuralTimelineAnalysisCnisContributionPeriodStatusEnum | null;

  @Description('Valor médio de contribuição.')
  public readonly averageContributionAmount: DecimalValue | null;

  @Description('Intenção de ajuste de contribuição.')
  public readonly contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;

  @Description('Intenção de suplementação externa.')
  public readonly externalSupplementationIntent: boolean;

  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodEntity.name;

  public constructor(
    props: RuralTimelineAnalysisCnisContributionPeriodEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisCnisContributionPeriodId, props);

    this.ruralTimelineId = props.ruralTimelineId ?? null;
    this.employmentRelationshipSource =
      props.employmentRelationshipSource ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.qualifyingPeriod = props.qualifyingPeriod ?? null;
    this.status = props.status ?? null;
    this.averageContributionAmount = props.averageContributionAmount ?? null;
    this.contributionAdjustmentIntent = props.contributionAdjustmentIntent;
    this.externalSupplementationIntent = props.externalSupplementationIntent;
  }
}
