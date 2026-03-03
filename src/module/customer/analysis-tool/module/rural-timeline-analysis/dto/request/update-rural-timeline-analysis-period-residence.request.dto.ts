import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisPeriodResidenceRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({
    description:
      'Nome da cidade/município onde o cliente residia durante o período de atividade rural.',
    required: false,
  })
  public city?: string;

  @RequestDtoEnumProperty(StateCodeEnum, {
    description:
      'Sigla do estado (UF) onde o cliente residia (ex: SP, MG, RS).',
    required: false,
  })
  public stateCode?: StateCodeEnum;

  @RequestDtoValueObjectProperty(DecimalValue, {
    description:
      'Distância em quilômetros entre a residência do cliente e a propriedade rural onde trabalhava.',
    required: false,
  })
  public distanceToPropertyKm?: DecimalValue;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodResidenceRequestDto.name;
}
