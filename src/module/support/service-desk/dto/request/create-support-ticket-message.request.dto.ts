import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSupportTicketMessageRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AuthIdentityId)
  public senderAuthIdentityId: AuthIdentityId;

  @RequestDtoStringProperty()
  public senderName: string;

  @RequestDtoStringProperty()
  public messageText: string;

  protected override readonly _type = CreateSupportTicketMessageRequestDto.name;
}
