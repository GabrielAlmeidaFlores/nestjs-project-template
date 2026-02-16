import { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialActivityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialActivityId)
  public specialActivityId: SpecialActivityId;

  protected override readonly _type =
    CreateSpecialActivityAnalysisResponseDto.name;
}
