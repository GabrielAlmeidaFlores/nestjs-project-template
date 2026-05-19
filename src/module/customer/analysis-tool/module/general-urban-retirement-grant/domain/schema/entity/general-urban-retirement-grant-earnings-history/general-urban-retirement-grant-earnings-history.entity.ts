import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/value-object/general-urban-retirement-grant-earnings-history-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { GeneralUrbanRetirementGrantEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.entity.props.interface';
import type { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';

export class GeneralUrbanRetirementGrantEarningsHistoryEntity extends BaseEntity<GeneralUrbanRetirementGrantEarningsHistoryId> {
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
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity | null;

  @Description('Período associado.')
  public readonly generalUrbanRetirementGrantPeriod: GeneralUrbanRetirementGrantPeriodEntity | null;

  @Description('Competência abaixo do mínimo.')
  public readonly competenceBelowTheMinimum: boolean | null;

  @Description('Análise do histórico de remunerações.')
  public readonly analysis: string | null;

  protected readonly _type =
    GeneralUrbanRetirementGrantEarningsHistoryEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantEarningsHistoryEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantEarningsHistoryId, props);

    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.generalUrbanRetirementGrant =
      props.generalUrbanRetirementGrant ?? null;
    this.generalUrbanRetirementGrantPeriod =
      props.generalUrbanRetirementGrantPeriod ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.analysis = props.analysis ?? null;
  }
}
