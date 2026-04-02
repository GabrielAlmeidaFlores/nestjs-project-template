import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@RequestDto()
export class ListTicketsAdminRequestDto extends ListDataRequestDto {
  @RequestDtoValueObjectProperty(SupportAttendantId, { required: false })
  public supportAttendantId?: SupportAttendantId;

  @RequestDtoEnumProperty(SupportTypeEnum, { required: false })
  public supportType?: SupportTypeEnum;

  @RequestDtoEnumProperty(SupportTicketStatusEnum, { required: false })
  public status?: SupportTicketStatusEnum;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({
    required: false,
    description:
      'Busca por número da solicitação, nome do usuário ou e-mail do usuário.',
  })
  public override search?: string;

  protected override readonly _type = ListTicketsAdminRequestDto.name;
}
