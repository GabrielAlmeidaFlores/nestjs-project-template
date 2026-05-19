import { MaternityPayGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/generic/maternity-pay-grant-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMaternityPayGrantFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => MaternityPayGrantFirstAnalysisModel)
  public maternityPayGrantFirstAnalysis: MaternityPayGrantFirstAnalysisModel;

  protected override readonly _type =
    CreateMaternityPayGrantFirstAnalysisResponseDto.name;
}
