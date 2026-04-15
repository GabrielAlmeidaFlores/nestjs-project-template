import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { GeneralUrbanRetirementDenialFirstAnalysisModel } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/generic/general-urban-retirement-denial-first-analysis.model';

@ResponseDto()
export class CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => GeneralUrbanRetirementDenialFirstAnalysisModel)
  public generalUrbanRetirementDenialFirstAnalysis: GeneralUrbanRetirementDenialFirstAnalysisModel;

  protected override readonly _type =
    CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto.name;
}
