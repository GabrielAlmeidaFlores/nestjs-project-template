import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisPeriodPendingExitDateRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description:
      'Data específica de uma pendência sem data de saída no período rural.',
    required: false,
  })
  public pendingDate?: Date;

  @RequestDtoValueObjectProperty(DecimalValue, {
    description: 'Valor decimal associado à pendência sem data de saída.',
    required: false,
  })
  public pendingAmount?: DecimalValue;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodPendingExitDateRequestDto.name;
}
