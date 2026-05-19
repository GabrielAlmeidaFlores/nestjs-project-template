import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodPendingExitDateEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/special-retirement-grant-period-pending-exit-date.entity.props.interface';
import { SpecialRetirementGrantPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/value-object/special-retirement-grant-period-pending-exit-date-id/special-retirement-grant-period-pending-exit-date-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantPeriodPendingExitDateEntity extends BaseEntity<SpecialRetirementGrantPeriodPendingExitDateId> {
  @Description('Data pendente de saída.')
  public readonly pendingDate: Date;

  @Description('Valor pendente associado.')
  public readonly pendingAmount: DecimalValue;

  @Description('Período associado.')
  public readonly specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;

  protected readonly _type =
    SpecialRetirementGrantPeriodPendingExitDateEntity.name;

  public constructor(
    props: SpecialRetirementGrantPeriodPendingExitDateEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantPeriodPendingExitDateId, props);
    this.pendingDate = props.pendingDate;
    this.pendingAmount = props.pendingAmount;
    this.specialRetirementGrantPeriod = props.specialRetirementGrantPeriod;
  }
}
