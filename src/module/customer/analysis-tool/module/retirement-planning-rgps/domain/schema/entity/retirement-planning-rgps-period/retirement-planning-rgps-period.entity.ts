import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/enum/reason-pendency.enum';
import { RetirementPlanningRgpsPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity.props.interface';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRgpsPeriodEntity extends BaseEntity<RetirementPlanningRgpsPeriodId> {
  @Description('Número sequencial do vínculo no CNIS.')
  public readonly sequencial: number | null;

  @Description('Nome do período de contribuição RGPS.')
  public readonly periodName: string | null;

  @Description('Data de início do período de contribuição RGPS.')
  public readonly periodStart: Date | null;

  @Description('Data de término do período de contribuição RGPS.')
  public readonly periodEnd: Date | null;

  @Description('Categoria do período de contribuição RGPS.')
  public readonly category: string | null;

  @Description('Indica se há pendência no período de contribuição RGPS.')
  public readonly isPendency: boolean | null;

  @Description(
    'Indica se a competência está abaixo do mínimo no período de contribuição RGPS.',
  )
  public readonly competenceBelowTheMinimum: boolean | null;

  @Description('Média de contribuição no período de contribuição RGPS.')
  public readonly contributionAverage: DecimalValue | null;

  @Description('Tipo de contribuição no período de contribuição RGPS.')
  public readonly typeOfContribution: string | null;
  @Description(
    'Planejamento de aposentadoria RGPS associado ao período de contribuição.',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  @Description('Status do período de contribuição RGPS.')
  public readonly status: boolean | null;

  @Description('Razão da pendência no período de contribuição RGPS.')
  public readonly reasonPendency: ReasonPendencyEnum | null;

  protected readonly _type = RetirementPlanningRgpsPeriodEntity.name;

  public constructor(props: RetirementPlanningRgpsPeriodEntityPropsInterface) {
    super(RetirementPlanningRgpsPeriodId, props);
    this.sequencial = props.sequencial ?? null;
    this.periodName = props.periodName ?? null;
    this.periodStart = props.periodStart ?? null;
    this.periodEnd = props.periodEnd ?? null;
    this.category = props.category ?? null;
    this.isPendency = props.isPendency ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.typeOfContribution = props.typeOfContribution ?? null;
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? null;
    this.status = props.status ?? null;
    this.reasonPendency = props.reasonPendency ?? null;
  }
}
