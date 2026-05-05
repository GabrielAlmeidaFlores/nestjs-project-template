import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
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

  protected override readonly _type = PreviousBenefitRequestDto.name;
}
