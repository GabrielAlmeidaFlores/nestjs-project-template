import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SupportTicketItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public ticketNumber: string;

  @ResponseDtoStringProperty()
  public requesterName: string;

  @ResponseDtoStringProperty()
  public requesterEmail: string;

  @ResponseDtoStringProperty()
  public subject: string;

  @ResponseDtoDateProperty()
  public requestDate: Date;

  @ResponseDtoEnumProperty(SupportTicketStatusEnum)
  public status: SupportTicketStatusEnum;

  protected override readonly _type = SupportTicketItemResponseDto.name;
}
