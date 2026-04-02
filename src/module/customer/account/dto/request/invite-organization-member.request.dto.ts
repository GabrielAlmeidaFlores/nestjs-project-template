import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class InviteOrganizationMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public invitedName: string;

  @RequestDtoValueObjectProperty(Email)
  public email: Email;

  protected override readonly _type = InviteOrganizationMemberRequestDto.name;
}
