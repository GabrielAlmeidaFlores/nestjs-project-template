import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteGeneralUrbanRetirementAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementAnalysisId)
  public generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId;

  protected override readonly _type =
    DeleteGeneralUrbanRetirementAnalysisResponseDto.name;
}
