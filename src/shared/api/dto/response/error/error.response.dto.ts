import { ResponseDto } from '@shared/api/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-string-property.decorator';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

@ResponseDto()
export class ErrorResponseDto {
  @ResponseDtoStringProperty()
  public message: string;

  @ResponseDtoStringProperty()
  public error: string;

  @ResponseDtoNumberProperty()
  public statusCode: number;

  protected readonly _type = ErrorResponseDto.name;

  public constructor(props: PublicPropertyType<ErrorResponseDto>) {
    this.message = props.message;
    this.error = props.error;
    this.statusCode = props.statusCode;
  }
}
