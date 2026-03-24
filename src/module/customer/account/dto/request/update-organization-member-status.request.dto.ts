import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateOrganizationMemberStatusRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty()
  public isActive: boolean;

  protected override readonly _type =
    UpdateOrganizationMemberStatusRequestDto.name;
}
