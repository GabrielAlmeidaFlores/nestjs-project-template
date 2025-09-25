import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class SetOrganizationForCustomerResponseDto extends BaseBuildableObject {
  @ResponseDtoBooleanProperty()
  public owner: boolean;

  protected override readonly _type =
    SetOrganizationForCustomerResponseDto.name;
}
