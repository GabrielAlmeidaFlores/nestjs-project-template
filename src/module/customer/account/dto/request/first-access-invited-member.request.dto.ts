import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { FirstAccessInvitedMemberAddressRequestDto } from '@module/customer/account/dto/request/first-access-invited-member-address.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class FirstAccessInvitedMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoValueObjectProperty(Email)
  public email: Email;

  @RequestDtoValueObjectProperty(PhoneNumber)
  public phoneNumber: PhoneNumber;

  @RequestDtoValueObjectProperty(FederalDocument)
  public federalDocument: FederalDocument;

  @RequestDtoStringProperty()
  public password: string;

  @RequestDtoObjectProperty(() => FirstAccessInvitedMemberAddressRequestDto)
  public customerAddress: FirstAccessInvitedMemberAddressRequestDto;

  @RequestDtoStringProperty()
  public inviteCode: string;

  protected override readonly _type = FirstAccessInvitedMemberRequestDto.name;
}
