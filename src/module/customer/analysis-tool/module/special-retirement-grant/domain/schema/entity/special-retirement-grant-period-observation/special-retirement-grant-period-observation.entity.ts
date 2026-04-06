import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodObservationEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/special-retirement-grant-period-observation.entity.props.interface';
import { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantPeriodObservationEntity extends BaseEntity<SpecialRetirementGrantPeriodObservationId> {
  @Description('Observação do período.')
  public readonly observation: string;

  @Description('Período associado.')
  public readonly specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;

  protected readonly _type = SpecialRetirementGrantPeriodObservationEntity.name;

  public constructor(
    props: SpecialRetirementGrantPeriodObservationEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantPeriodObservationId, props);
    this.observation = props.observation;
    this.specialRetirementGrantPeriod = props.specialRetirementGrantPeriod;
  }
}
