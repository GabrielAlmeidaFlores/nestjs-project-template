import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/enum/rural-timeline-cnis-contribution-period-status.enum';
import { RuralTimelineCnisContributionPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/rural-timeline-cnis-contribution-period.entity.props.interface';
import { RuralTimelineCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/value-object/rural-timeline-cnis-contribution-period-id/rural-timeline-cnis-contribution-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

export class RuralTimelineCnisContributionPeriodEntity extends BaseEntity<RuralTimelineCnisContributionPeriodId> {
  @Description('ID da linha do tempo rural associada.')
  public readonly ruralTimelineId: RuralTimelineId | null;

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
  public readonly status: RuralTimelineCnisContributionPeriodStatusEnum | null;

  @Description('Valor médio de contribuição.')
  public readonly averageContributionAmount: DecimalValue | null;

  @Description('Intenção de ajuste de contribuição.')
  public readonly contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;

  @Description('Intenção de suplementação externa.')
  public readonly externalSupplementationIntent: boolean;

  protected readonly _type = RuralTimelineCnisContributionPeriodEntity.name;

  public constructor(
    props: RuralTimelineCnisContributionPeriodEntityPropsInterface,
  ) {
    super(RuralTimelineCnisContributionPeriodId, props);

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
