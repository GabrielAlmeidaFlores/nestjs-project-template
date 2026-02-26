import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeGeneralUrbanRetirementGrantCnisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementGrantAnalysisResultId)
  public generalUrbanRetirementGrantAnalysisResultId: GeneralUrbanRetirementGrantAnalysisResultId;

  @ResponseDtoStringProperty()
  public result: string;

  protected override readonly _type =
    AnalyzeGeneralUrbanRetirementGrantCnisResponseDto.name;
}
