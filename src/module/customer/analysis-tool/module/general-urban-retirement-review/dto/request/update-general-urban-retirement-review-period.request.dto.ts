import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateGeneralUrbanRetirementReviewPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public periodName?: string;

  @RequestDtoStringProperty({ required: false })
  public category?: string;

  protected override readonly _type =
    UpdateGeneralUrbanRetirementReviewPeriodRequestDto.name;
}
