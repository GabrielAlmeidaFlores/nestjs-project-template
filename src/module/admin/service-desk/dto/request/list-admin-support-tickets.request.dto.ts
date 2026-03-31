import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListAdminSupportTicketsRequestDto extends ListDataRequestDto {
  @RequestDtoEnumProperty(SupportTicketStatusEnum, { required: false })
  public status?: SupportTicketStatusEnum;

  @RequestDtoEnumProperty(SupportTypeEnum, { required: false })
  public supportType?: SupportTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public ticketNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public override search?: string;

  @RequestDtoDateProperty({ required: false })
  public from?: Date;

  @RequestDtoDateProperty({ required: false })
  public to?: Date;

  protected override readonly _type = ListAdminSupportTicketsRequestDto.name;
}
