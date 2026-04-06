import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListSupportTicketMessagesResponseDto extends ListDataResponseDto<SupportTicketMessageItemResponseDto> {
  @ResponseDtoObjectProperty(() => SupportTicketMessageItemResponseDto, {
    isArray: true,
  })
  public override resource: SupportTicketMessageItemResponseDto[];

  protected override readonly _type = ListSupportTicketMessagesResponseDto.name;
}
