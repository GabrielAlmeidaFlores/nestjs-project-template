import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GetSpecialCategoryRetirementAnalysisTimelineRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public showSpecialActivity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public showCommonActivity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public showOverlaps?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public showGaps?: boolean;

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisTimelineRequestDto.name;
}
