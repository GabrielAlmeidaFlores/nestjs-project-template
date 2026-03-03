import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RuralTimelineAnalysisPeriodResidenceEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity.props.interface';
import { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisPeriodResidenceEntity extends BaseEntity<RuralTimelineAnalysisPeriodResidenceId> {
  @Description(
    'Nome da cidade/município onde o cliente residia durante o período de atividade rural.',
  )
  public readonly city: string;

  @Description('Sigla do estado (UF) onde o cliente residia (ex: SP, MG, RS).')
  public readonly stateCode: StateCodeEnum;

  @Description(
    'Distância em quilômetros entre a residência do cliente e a propriedade rural onde trabalhava.',
  )
  public readonly distanceToPropertyKm: DecimalValue;

  protected readonly _type = RuralTimelineAnalysisPeriodResidenceEntity.name;

  public constructor(
    props: RuralTimelineAnalysisPeriodResidenceEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisPeriodResidenceId, props);

    this.city = props.city;
    this.stateCode = props.stateCode;
    this.distanceToPropertyKm = props.distanceToPropertyKm;
  }
}
