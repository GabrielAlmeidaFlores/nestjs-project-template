import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/value-object/general-urban-retirement-review-earnings-history-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { GeneralUrbanRetirementReviewEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.entity.props.interface';
import type { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';

export class GeneralUrbanRetirementReviewEarningsHistoryEntity extends BaseEntity<GeneralUrbanRetirementReviewEarningsHistoryId> {
  @Description('Competência da remuneração.')
  public readonly competence: Date | null;

  @Description('Valor ou descrição da remuneração.')
  public readonly remuneration: string | null;

  @Description('Indicadores do histórico de remunerações.')
  public readonly indicators: string | null;

  @Description('Data de pagamento da remuneração.')
  public readonly paymentDate: Date | null;

  @Description('Informações de contribuição.')
  public readonly contribution: string | null;

  @Description('Representação da contribuição salarial.')
  public readonly contributionSalary: string | null;

  @Description('Concessão de aposentadoria urbana associada.')
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity | null;

  @Description('Período associado.')
  public readonly generalUrbanRetirementReviewPeriod: GeneralUrbanRetirementReviewPeriodEntity | null;

  @Description('Competência abaixo do mínimo.')
  public readonly competenceBelowTheMinimum: boolean | null;

  @Description('Análise do histórico de remunerações.')
  public readonly analysis: string | null;

  protected readonly _type =
    GeneralUrbanRetirementReviewEarningsHistoryEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewEarningsHistoryEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewEarningsHistoryId, props);

    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.generalUrbanRetirementReview =
      props.generalUrbanRetirementReview ?? null;
    this.generalUrbanRetirementReviewPeriod =
      props.generalUrbanRetirementReviewPeriod ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.analysis = props.analysis ?? null;
  }
}
