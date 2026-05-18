import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto,
    { isArray: true },
  )
  public dependentPensionAnalyses: GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto[];

  protected override readonly _type =
    ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto.name;
}
