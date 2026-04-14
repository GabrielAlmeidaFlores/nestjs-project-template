import { SurvivorPensionAnalysisDeceasedBenefitDependentsItemRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/survivor-pension-analysis-deceased-benefit-dependents-item.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PutSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SurvivorPensionAnalysisDeceasedBenefitDependentsItemRequestDto,
    { isArray: true },
  )
  public dependents: SurvivorPensionAnalysisDeceasedBenefitDependentsItemRequestDto[];

  protected override readonly _type =
    PutSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto.name;
}
