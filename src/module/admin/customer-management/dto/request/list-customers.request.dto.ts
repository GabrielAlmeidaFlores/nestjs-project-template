import { CustomerTypeEnum } from '@module/admin/customer-management/dto/enum/customer-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListCustomersRequestDto extends ListDataRequestDto {
  @RequestDtoEnumProperty(CustomerTypeEnum, { required: false })
  public type?: CustomerTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public searchBy?: string;

  protected override readonly _type = ListCustomersRequestDto.name;
}
