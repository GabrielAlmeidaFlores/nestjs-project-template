import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SupportTicketListItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SupportTicketId)
  public supportTicketId: SupportTicketId;

  @ResponseDtoStringProperty()
  public ticketNumber: string;

  @ResponseDtoStringProperty()
  public requesterEmail: string;

  @ResponseDtoStringProperty()
  public requesterName: string;

  @ResponseDtoStringProperty()
  public subject: string;

  @ResponseDtoEnumProperty(SupportTypeEnum)
  public supportType: SupportTypeEnum;

  @ResponseDtoEnumProperty(SupportTicketStatusEnum)
  public status: SupportTicketStatusEnum;

  @ResponseDtoStringProperty({ required: false })
  public assignedAttendantName?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = SupportTicketListItemResponseDto.name;
}
