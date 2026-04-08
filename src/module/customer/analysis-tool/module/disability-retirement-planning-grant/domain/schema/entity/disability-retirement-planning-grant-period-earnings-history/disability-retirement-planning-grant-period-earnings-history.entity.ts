import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/value-object/disability-retirement-planning-grant-period-earnings-history-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import type { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.entity.props.interface';

export class DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity extends BaseEntity<DisabilityRetirementPlanningGrantPeriodEarningsHistoryId> {
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

  @Description('Análise do histórico de remunerações.')
  public readonly analysis: string | null;

  @Description('Competência abaixo do mínimo.')
  public readonly competenceBelowTheMinimum: boolean | null;

  @Description('ID do período de concessão associado.')
  public readonly disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantPeriodEarningsHistoryId, props);

    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.analysis = props.analysis ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.disabilityRetirementPlanningGrantPeriodId =
      props.disabilityRetirementPlanningGrantPeriodId;
  }
}
