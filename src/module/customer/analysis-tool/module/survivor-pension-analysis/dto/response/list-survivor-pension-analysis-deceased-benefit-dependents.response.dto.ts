import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto,
    { isArray: true },
  )
  public dependents: GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto[];

  protected override readonly _type =
    ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto.name;
}
