import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly status: string;

  @ResponseDtoStringProperty()
  public readonly description: string;

  protected override readonly _type =
    AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel.name;
}

@ResponseDto()
export class AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly existsSequelae: string;

  @ResponseDtoStringProperty()
  public readonly sequelaeCompatibility: string;

  @ResponseDtoStringProperty()
  public readonly partialWorkCapacityMaintenance: string;

  @ResponseDtoStringProperty()
  public readonly description: string;

  protected override readonly _type =
    AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel.name;
}

@ResponseDto()
export class AccidentAssistanceTerminatedFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel,
  )
  public readonly qualitySecurity: AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel;

  @ResponseDtoObjectProperty(
    () => AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel,
  )
  public readonly assessmentSequelae: AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel;

  protected override readonly _type =
    AccidentAssistanceTerminatedFirstAnalysisModel.name;
}
