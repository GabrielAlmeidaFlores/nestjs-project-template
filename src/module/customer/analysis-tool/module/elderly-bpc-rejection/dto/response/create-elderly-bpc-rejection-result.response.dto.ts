import { ElderlyBpcRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/interface/elderly-bpc-rejection-complete-analysis.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateElderlyBpcRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public elderlyBpcRejectionCompleteAnalysis: ElderlyBpcRejectionCompleteAnalysisInterface;

  @ResponseDtoStringProperty({ required: false })
  public elderlyBpcRejectionSimplifiedAnalysis?: string;

  protected override readonly _type =
    CreateElderlyBpcRejectionResultResponseDto.name;
}
