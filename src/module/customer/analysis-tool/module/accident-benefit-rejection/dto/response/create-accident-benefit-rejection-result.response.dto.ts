import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { AccidentBenefitRejectionResultInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/interface/accident-benefit-rejection-result.interface';

@ResponseDto()
export class CreateAccidentBenefitRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public accidentBenefitRejectionCompleteAnalysis: AccidentBenefitRejectionResultInterface;

  protected override readonly _type =
    CreateAccidentBenefitRejectionResultResponseDto.name;
}
