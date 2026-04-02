import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@RequestDto()
export class ListSupportAttendantsRequestDto extends ListDataRequestDto {
  @RequestDtoStringProperty({
    required: false,
    description: 'Pesquisar por nome ou e-mail',
  })
  public override search?: string;

  @RequestDtoEnumProperty(SupportTypeEnum, { required: false })
  public supportType?: SupportTypeEnum;

  protected override readonly _type = ListSupportAttendantsRequestDto.name;
}
