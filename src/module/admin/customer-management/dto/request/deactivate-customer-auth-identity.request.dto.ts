import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DeactivateCustomerAuthIdentityRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(CustomerId)
  public customerId: CustomerId;

  protected override readonly _type =
    DeactivateCustomerAuthIdentityRequestDto.name;
}
