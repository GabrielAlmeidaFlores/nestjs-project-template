import { ApiProperty } from '@nestjs/swagger';

import { RequireBuildMethod } from '@shared/system/decorator/class/require-build-method/require-build-method.decorator';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

@RequireBuildMethod<ErrorResponseDto>()
export class ErrorResponseDto {
  @ApiProperty()
  public message: string;

  @ApiProperty()
  public error: string;

  @ApiProperty()
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
