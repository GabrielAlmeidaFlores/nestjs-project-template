import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodOverdueContributionEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/special-retirement-grant-period-overdue-contribution.entity.props.interface';
import { SpecialRetirementGrantPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/value-object/special-retirement-grant-period-overdue-contribution-id/special-retirement-grant-period-overdue-contribution-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantPeriodOverdueContributionEntity extends BaseEntity<SpecialRetirementGrantPeriodOverdueContributionId> {
  @Description('Competência em atraso (PEXT).')
  public readonly overdueDate: Date;

  @Description('Data de pagamento (quando informada).')
  public readonly paymentDate: Date | null;

  @Description('Período associado.')
  public readonly specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;

  protected readonly _type =
    SpecialRetirementGrantPeriodOverdueContributionEntity.name;

  public constructor(
    props: SpecialRetirementGrantPeriodOverdueContributionEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantPeriodOverdueContributionId, props);
    this.overdueDate = props.overdueDate;
    this.paymentDate = props.paymentDate;
    this.specialRetirementGrantPeriod = props.specialRetirementGrantPeriod;
  }
}
