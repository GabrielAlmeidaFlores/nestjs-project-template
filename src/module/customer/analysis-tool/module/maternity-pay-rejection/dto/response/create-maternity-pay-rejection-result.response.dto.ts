import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { MaternityPayRejectionResultInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/interface/maternity-pay-rejection-result.interface';

@ResponseDto()
export class CreateMaternityPayRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public maternityPayRejectionCompleteAnalysis: MaternityPayRejectionResultInterface;

  protected override readonly _type =
    CreateMaternityPayRejectionResultResponseDto.name;
}
