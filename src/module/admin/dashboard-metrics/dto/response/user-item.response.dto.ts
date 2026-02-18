import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UserItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public customerId: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoValueObjectProperty(Email)
  public email: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber)
  public phoneNumber: PhoneNumber;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = UserItemResponseDto.name;
}
