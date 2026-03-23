import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateCreditPackRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public price?: DecimalValue;

  @RequestDtoNumberProperty({ required: false })
  public creditAmount?: number;

  @RequestDtoBooleanProperty({ required: false })
  public active?: boolean;

  protected override readonly _type = UpdateCreditPackRequestDto.name;
}
