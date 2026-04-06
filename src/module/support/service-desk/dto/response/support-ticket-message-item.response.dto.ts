import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SupportTicketMessageItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public senderAuthIdentityId: string;

  @ResponseDtoStringProperty()
  public senderName: string;

  @ResponseDtoStringProperty()
  public messageText: string;

  @ResponseDtoDateProperty()
  public messageDateTime: Date;

  protected override readonly _type = SupportTicketMessageItemResponseDto.name;
}
