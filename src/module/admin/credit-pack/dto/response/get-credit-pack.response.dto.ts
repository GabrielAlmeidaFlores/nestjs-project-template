import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetCreditPackResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CreditPackId)
  public creditPackId: CreditPackId;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public price: DecimalValue;

  @ResponseDtoNumberProperty()
  public creditAmount: number;

  @ResponseDtoBooleanProperty()
  public active: boolean;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetCreditPackResponseDto.name;
}
