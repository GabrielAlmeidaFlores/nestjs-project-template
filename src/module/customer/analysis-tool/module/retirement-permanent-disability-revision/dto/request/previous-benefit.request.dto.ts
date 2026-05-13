import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PreviousBenefitRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty()
  public hasPreviousBenefit: boolean;

  @RequestDtoStringProperty({ required: false })
  public benefitNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public benefitStartDate?: string;

  @RequestDtoStringProperty({ required: false })
  public benefitEndDate?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public associatedCids?: string[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public benefitDeclarations?: Base64FileRequestDto[];

  protected override readonly _type = PreviousBenefitRequestDto.name;
}
