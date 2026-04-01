import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateCustomerSupportTicketResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public ticketNumber: string;

  @ResponseDtoEnumProperty(SupportTicketStatusEnum)
  public status: SupportTicketStatusEnum;

  @ResponseDtoDateProperty()
  public openedAt: Date;

  protected override readonly _type =
    CreateCustomerSupportTicketResponseDto.name;
}
