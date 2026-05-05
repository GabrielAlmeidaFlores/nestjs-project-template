import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/reason-pendency.enum';
import { GeneralUrbanRetirementReviewPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity.props.interface';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementReviewPeriodEntity extends BaseEntity<GeneralUrbanRetirementReviewPeriodId> {
  @Description('Nome do período de contribuição.')
  public readonly periodName: string | null;

  @Description('Data de início do período de contribuição.')
  public readonly periodStart: Date | null;

  @Description('Data de término do período de contribuição.')
  public readonly periodEnd: Date | null;

  @Description('Categoria do período de contribuição.')
  public readonly category: string | null;

  @Description('Indica se há pendência no período.')
  public readonly isPendency: boolean | null;

  @Description('Indica se a competência está abaixo do mínimo.')
  public readonly competenceBelowTheMinimum: boolean | null;

  @Description('Média de contribuição no período.')
  public readonly contributionAverage: DecimalValue | null;

  @Description('Tipo de contribuição no período.')
  public readonly typeOfContribution: string | null;

  @Description('Concessão de aposentadoria urbana associada ao período.')
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity | null;

  @Description('Status do período.')
  public readonly status: boolean | null;

  @Description('Razão da pendência no período.')
  public readonly reasonPendency: ReasonPendencyEnum | null;

  protected readonly _type = GeneralUrbanRetirementReviewPeriodEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewPeriodEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewPeriodId, props);
    this.periodName = props.periodName ?? null;
    this.periodStart = props.periodStart ?? null;
    this.periodEnd = props.periodEnd ?? null;
    this.category = props.category ?? null;
    this.isPendency = props.isPendency ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.typeOfContribution = props.typeOfContribution ?? null;
    this.generalUrbanRetirementReview =
      props.generalUrbanRetirementReview ?? null;
    this.status = props.status ?? null;
    this.reasonPendency = props.reasonPendency ?? null;
  }
}
