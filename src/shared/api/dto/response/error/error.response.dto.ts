import { ResponseDto } from '@shared/api/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-string-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class ErrorResponseDto extends BaseBuildableObject {
  @ResponseDtoStringProperty()
  public message: string;

  @ResponseDtoStringProperty()
  public error: string;

  @ResponseDtoNumberProperty()
  public statusCode: number;

  protected override readonly _type = ErrorResponseDto.name;
}
