import { SupportTicketListItemResponseDto } from '@module/customer/service-desk/dto/response/support-ticket-list-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListSupportTicketsResponseDto extends ListDataResponseDto<SupportTicketListItemResponseDto> {
  @ResponseDtoObjectProperty(() => SupportTicketListItemResponseDto, {
    isArray: true,
  })
  public override resource: SupportTicketListItemResponseDto[];

  protected override readonly _type = ListSupportTicketsResponseDto.name;
}
