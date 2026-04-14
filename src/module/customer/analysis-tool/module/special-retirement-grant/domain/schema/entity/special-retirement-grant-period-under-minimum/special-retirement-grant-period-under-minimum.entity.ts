import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodUnderMinimumEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/special-retirement-grant-period-under-minimum.entity.props.interface';
import { SpecialRetirementGrantPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/value-object/special-retirement-grant-period-under-minimum-id/special-retirement-grant-period-under-minimum-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantPeriodUnderMinimumEntity extends BaseEntity<SpecialRetirementGrantPeriodUnderMinimumId> {
  @Description('Competência com contribuição abaixo do mínimo.')
  public readonly contributionDate: Date;

  @Description('Valor da contribuição abaixo do mínimo.')
  public readonly contributionAmount: DecimalValue;

  @Description('Período associado.')
  public readonly specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;

  protected readonly _type =
    SpecialRetirementGrantPeriodUnderMinimumEntity.name;

  public constructor(
    props: SpecialRetirementGrantPeriodUnderMinimumEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantPeriodUnderMinimumId, props);
    this.contributionDate = props.contributionDate;
    this.contributionAmount = props.contributionAmount;
    this.specialRetirementGrantPeriod = props.specialRetirementGrantPeriod;
  }
}
