import { SupportTicketAttachmentDetailResponseDto } from '@module/support/service-desk/dto/response/support-ticket-attachment-detail.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@ResponseDto()
export class GetSupportTicketDetailsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public ticketNumber: string;

  @ResponseDtoEnumProperty(SupportTypeEnum)
  public supportType: SupportTypeEnum;

  @ResponseDtoDateProperty()
  public openedAt: Date;

  @ResponseDtoStringProperty()
  public analysisType: string;

  @ResponseDtoStringProperty()
  public requesterName: string;

  @ResponseDtoStringProperty()
  public requesterEmail: string;

  @ResponseDtoStringProperty()
  public subject: string;

  @ResponseDtoStringProperty()
  public problemDescription: string;

  @ResponseDtoObjectProperty(() => SupportTicketAttachmentDetailResponseDto, {
    isArray: true,
  })
  public attachments: SupportTicketAttachmentDetailResponseDto[];

  protected override readonly _type = GetSupportTicketDetailsResponseDto.name;
}
