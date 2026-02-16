import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-earnings-history/value-object/retirement-planning-rgps-earnings-history-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.entity.props.interface';
import type { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';

export class RetirementPlanningRgpsEarningsHistoryEntity extends BaseEntity<RetirementPlanningRgpsEarningsHistoryId> {
  @Description('Competencia da remuneração do RGPS.')
  public readonly competence: Date | null;

  @Description('Valor ou descrição da remuneração.')
  public readonly remuneration: string | null;

  @Description('Indicadores do histórico de remunerações do CNIS.')
  public readonly indicators: string | null;

  @Description('Data de pagamento da remuneração.')
  public readonly paymentDate: Date | null;

  @Description('Informações de contribuição do CNIS.')
  public readonly contribution: string | null;

  @Description('Representação da contribuição salarial do CNIS.')
  public readonly contributionSalary: string | null;

  @Description('Planejamento de aposentadoria RGPS associado.')
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  @Description('Periodo do planejamento de aposentadoria RGPS associado.')
  public readonly retirementPlanningRgpsPeriod: RetirementPlanningRgpsPeriodEntity | null;

  @Description('Competencia abaixo do minimo')
  public readonly competenceBelowTheMinimum: boolean | null;

  @Description('Análise do histórico de remunerações do RGPS.')
  public readonly analysis: string | null;

  protected readonly _type = RetirementPlanningRgpsEarningsHistoryEntity.name;

  public constructor(
    props: RetirementPlanningRgpsEarningsHistoryEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsEarningsHistoryId, props);

    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? null;
    this.retirementPlanningRgpsPeriod =
      props.retirementPlanningRgpsPeriod ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.analysis = props.analysis ?? null;
  }
}
