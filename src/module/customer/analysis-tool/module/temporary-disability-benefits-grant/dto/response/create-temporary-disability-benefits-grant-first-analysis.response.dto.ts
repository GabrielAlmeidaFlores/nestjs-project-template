import { CnisWorkPeriodsResponseModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-periods-response.model';
import { TemporaryDisabilityBenefitsGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/generic/temporary-disability-benefits-grant-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TemporaryDisabilityBenefitsGrantFirstAnalysisModel,
  )
  public temporaryDisabilityBenefitsGrantFirstAnalysis: TemporaryDisabilityBenefitsGrantFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => CnisWorkPeriodsResponseModel)
  public cnisWorkPeriods: CnisWorkPeriodsResponseModel;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto.name;
}
