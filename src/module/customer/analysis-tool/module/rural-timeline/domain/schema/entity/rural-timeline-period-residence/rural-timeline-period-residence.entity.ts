import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelinePeriodResidenceEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/rural-timeline-period-residence.entity.props.interface';
import { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelinePeriodResidenceEntity extends BaseEntity<RuralTimelinePeriodResidenceId> {
  @Description('Cidade da residência.')
  public readonly city: string;

  @Description('Código do estado.')
  public readonly stateCode: StateCodeEnum;

  @Description('Distância da propriedade em quilômetros.')
  public readonly distanceToPropertyKm: DecimalValue;

  protected readonly _type = RuralTimelinePeriodResidenceEntity.name;

  public constructor(props: RuralTimelinePeriodResidenceEntityPropsInterface) {
    super(RuralTimelinePeriodResidenceId, props);

    this.city = props.city;
    this.stateCode = props.stateCode;
    this.distanceToPropertyKm = props.distanceToPropertyKm;
  }
}
