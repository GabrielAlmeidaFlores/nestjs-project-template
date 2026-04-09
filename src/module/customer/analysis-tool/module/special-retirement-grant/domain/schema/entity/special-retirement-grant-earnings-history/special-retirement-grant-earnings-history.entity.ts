import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.entity.props.interface';
import { SpecialRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/value-object/special-retirement-grant-earnings-history-id/special-retirement-grant-earnings-history-id.value-object';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantEarningsHistoryEntity extends BaseEntity<SpecialRetirementGrantEarningsHistoryId> {
  @Description('Competência.')
  public readonly competence: Date | null;

  @Description('Remuneração.')
  public readonly remuneration: string | null;

  @Description('Indicadores CNIS.')
  public readonly indicators: string | null;

  @Description('Data de pagamento.')
  public readonly paymentDate: Date | null;

  @Description('Indica competência abaixo do mínimo.')
  public readonly competenceBelowTheMinimum: boolean | null;

  @Description('Concessão de aposentadoria especial associada.')
  public readonly specialRetirementGrant: SpecialRetirementGrantEntity;

  @Description('Período associado.')
  public readonly specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;

  protected readonly _type = SpecialRetirementGrantEarningsHistoryEntity.name;

  public constructor(
    props: SpecialRetirementGrantEarningsHistoryEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.specialRetirementGrant = props.specialRetirementGrant;
    this.specialRetirementGrantPeriod = props.specialRetirementGrantPeriod;
  }
}
