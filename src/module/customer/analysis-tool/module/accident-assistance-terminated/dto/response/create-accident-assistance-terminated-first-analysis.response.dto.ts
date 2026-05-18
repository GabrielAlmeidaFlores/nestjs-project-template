import { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import { AccidentAssistanceTerminatedFirstAnalysisModel } from '@module/customer/analysis-tool/module/accident-assistance-terminated/model/generic/accident-assistance-terminated-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AccidentAssistanceTerminatedFirstAnalysisModel,
  )
  public accidentAssistanceTerminatedFirstAnalysis: AccidentAssistanceTerminatedFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => CnisAnalysisResultModel)
  public cnisAnalysis: CnisAnalysisResultModel;

  protected override readonly _type =
    CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto.name;
}
