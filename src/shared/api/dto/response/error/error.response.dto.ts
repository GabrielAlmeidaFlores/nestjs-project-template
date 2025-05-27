import { ResponseDto } from '@shared/api/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-string-property.decorator';
import { RequireBuildMethod } from '@shared/system/decorator/class/require-build-method/require-build-method.decorator';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

@ResponseDto()
@RequireBuildMethod<ErrorResponseDto>()
export class ErrorResponseDto {
  @ResponseDtoStringProperty()
  public message: string;

  @ResponseDtoStringProperty()
  public error: string;

  @ResponseDtoNumberProperty()
  public statusCode: number;

  protected readonly _type = ErrorResponseDto.name;

  public constructor(message: string, error: string, statusCode: number) {
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
  }

  public static build(
    props: PublicPropertyType<ErrorResponseDto>,
  ): ErrorResponseDto {
    return new ErrorResponseDto(props.message, props.error, props.statusCode);
  }
}
