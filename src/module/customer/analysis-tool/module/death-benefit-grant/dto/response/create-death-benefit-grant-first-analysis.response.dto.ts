import { DeathBenefitGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/death-benefit-grant/model/generic/death-benefit-grant-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitGrantFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => DeathBenefitGrantFirstAnalysisModel)
  public deathBenefitGrantFirstAnalysis: DeathBenefitGrantFirstAnalysisModel;

  protected override readonly _type =
    CreateDeathBenefitGrantFirstAnalysisResponseDto.name;
}
