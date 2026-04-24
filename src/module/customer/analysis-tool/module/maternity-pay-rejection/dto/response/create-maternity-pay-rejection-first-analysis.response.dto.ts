import { MaternityPayRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/generic/maternity-pay-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMaternityPayRejectionFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => MaternityPayRejectionFirstAnalysisModel)
  public maternityPayRejectionFirstAnalysis: MaternityPayRejectionFirstAnalysisModel;

  protected override readonly _type =
    CreateMaternityPayRejectionFirstAnalysisResponseDto.name;
}
