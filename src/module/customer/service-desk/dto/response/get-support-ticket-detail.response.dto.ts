import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { GetSupportTicketDetailAttachmentResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail-attachment.response.dto';
import { GetSupportTicketDetailMessageResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail-message.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSupportTicketDetailResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoStringProperty()
  public problem: string;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoEnumProperty(SupportTypeEnum)
  public supportType: SupportTypeEnum;

  @ResponseDtoEnumProperty(SupportTicketStatusEnum)
  public status: SupportTicketStatusEnum;

  @ResponseDtoStringProperty({ required: false })
  public assignedAttendantName?: string;

  @ResponseDtoObjectProperty(
    () => GetSupportTicketDetailAttachmentResponseDto,
    {
      isArray: true,
    },
  )
  public attachments: GetSupportTicketDetailAttachmentResponseDto[];

  @ResponseDtoObjectProperty(() => GetSupportTicketDetailMessageResponseDto, {
    isArray: true,
  })
  public messages: GetSupportTicketDetailMessageResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = GetSupportTicketDetailResponseDto.name;
}
