import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/enum/reason-pendency.enum';
import { GeneralUrbanRetirementGrantPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity.props.interface';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementGrantPeriodEntity extends BaseEntity<GeneralUrbanRetirementGrantPeriodId> {
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
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity | null;

  @Description('Status do período.')
  public readonly status: boolean | null;

  @Description('Razão da pendência no período.')
  public readonly reasonPendency: ReasonPendencyEnum | null;

  protected readonly _type = GeneralUrbanRetirementGrantPeriodEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantPeriodEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantPeriodId, props);
    this.periodName = props.periodName ?? null;
    this.periodStart = props.periodStart ?? null;
    this.periodEnd = props.periodEnd ?? null;
    this.category = props.category ?? null;
    this.isPendency = props.isPendency ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.typeOfContribution = props.typeOfContribution ?? null;
    this.generalUrbanRetirementGrant =
      props.generalUrbanRetirementGrant ?? null;
    this.status = props.status ?? null;
    this.reasonPendency = props.reasonPendency ?? null;
  }
}
