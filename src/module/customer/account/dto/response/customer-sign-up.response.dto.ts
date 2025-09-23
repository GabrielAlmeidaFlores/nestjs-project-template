import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class CustomerSignUpResponseDto extends BaseBuildableObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public customer: CustomerId;

  protected override readonly _type = CustomerSignUpResponseDto.name;
}
