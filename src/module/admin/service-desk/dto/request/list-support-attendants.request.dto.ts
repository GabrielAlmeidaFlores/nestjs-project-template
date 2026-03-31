import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListSupportAttendantsRequestDto extends ListDataRequestDto {
  @RequestDtoEnumProperty(SupportTypeEnum, { required: false })
  public supportType?: SupportTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public override search?: string;

  protected override readonly _type = ListSupportAttendantsRequestDto.name;
}
