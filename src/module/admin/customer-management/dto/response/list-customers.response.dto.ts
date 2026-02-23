import { CustomerItemResponseDto } from '@module/admin/customer-management/dto/response/customer-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListCustomersResponseDto extends ListDataResponseDto<CustomerItemResponseDto> {
  @ResponseDtoObjectProperty(() => CustomerItemResponseDto, {
    isArray: true,
  })
  public override resource: CustomerItemResponseDto[];

  protected override readonly _type = ListCustomersResponseDto.name;
}
