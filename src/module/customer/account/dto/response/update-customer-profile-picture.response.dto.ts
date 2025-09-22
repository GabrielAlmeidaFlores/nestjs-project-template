import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class UpdateCustomerProfilePictureResponseDto extends BaseBuildableObject {
  @ResponseDtoStringProperty()
  public profilePicture: string;

  protected override readonly _type =
    UpdateCustomerProfilePictureResponseDto.name;
}
