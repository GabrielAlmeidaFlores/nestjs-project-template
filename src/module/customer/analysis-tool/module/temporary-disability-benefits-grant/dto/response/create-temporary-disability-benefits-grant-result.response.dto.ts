import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { TemporaryDisabilityBenefitsGrantResultInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/interface/temporary-disability-benefits-grant-result.interface';

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public temporaryDisabilityBenefitsGrantCompleteAnalysis: TemporaryDisabilityBenefitsGrantResultInterface;

  @ResponseDtoBooleanProperty()
  public isEligibleForTemporaryDisabilityBenefits: boolean;

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantResultResponseDto.name;
}
