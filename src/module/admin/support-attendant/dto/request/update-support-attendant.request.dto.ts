import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@RequestDto()
export class UpdateSupportAttendantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoEnumProperty(SupportTypeEnum, { required: false })
  public supportType?: SupportTypeEnum;

  @RequestDtoBooleanProperty({ required: false })
  public isActive?: boolean;

  protected override readonly _type = UpdateSupportAttendantRequestDto.name;
}
