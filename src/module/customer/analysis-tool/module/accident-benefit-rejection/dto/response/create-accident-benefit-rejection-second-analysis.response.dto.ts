import { AccidentBenefitRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/generic/accident-benefit-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAccidentBenefitRejectionSecondAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => AccidentBenefitRejectionFirstAnalysisModel)
  public accidentBenefitRejectionSecondAnalysis: AccidentBenefitRejectionFirstAnalysisModel;

  protected override readonly _type =
    CreateAccidentBenefitRejectionSecondAnalysisResponseDto.name;
}
