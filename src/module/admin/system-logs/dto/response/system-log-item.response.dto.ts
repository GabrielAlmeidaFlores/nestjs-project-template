import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SystemLogItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public code: number;

  @ResponseDtoStringProperty()
  public endpoint: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoBooleanProperty()
  public isError: boolean;

  @ResponseDtoStringProperty({ required: false })
  public stackTrace?: string;

  @ResponseDtoStringProperty({ required: false })
  public requestBody?: string;

  @ResponseDtoStringProperty({ required: false })
  public responseBody?: string;

  protected override readonly _type = SystemLogItemResponseDto.name;
}
