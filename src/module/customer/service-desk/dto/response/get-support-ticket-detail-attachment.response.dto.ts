import { SupportTicketAttachmentId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSupportTicketDetailAttachmentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SupportTicketAttachmentId)
  public supportTicketAttachmentId: SupportTicketAttachmentId;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoStringProperty()
  public signedUrl: string;

  protected override readonly _type =
    GetSupportTicketDetailAttachmentResponseDto.name;
}
