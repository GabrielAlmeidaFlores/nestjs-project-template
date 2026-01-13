import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class Base64FileRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(Base64)
  public readonly base64: Base64;

  @RequestDtoStringProperty({ required: true })
  public readonly originalFileName: string;

  protected override readonly _type = Base64FileRequestDto.name;
}
