import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SpecialRetirementRejectionRetirementRuleModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public ruleName: string;

  @ResponseDtoBooleanProperty()
  public fulfilled: boolean;

  @ResponseDtoStringProperty()
  public grantDate: string;

  @ResponseDtoNumberProperty()
  public expectedRmi: number;

  @ResponseDtoNumberProperty()
  public causeValue: number;

  @ResponseDtoBooleanProperty()
  public bestRmi: boolean;

  @ResponseDtoBooleanProperty()
  public biggestCauseValue: boolean;

  @ResponseDtoStringProperty()
  public detaildAnalysis: string;

  protected override readonly _type =
    SpecialRetirementRejectionRetirementRuleModel.name;
}

@ResponseDto()
export class SpecialRetirementRejectionCompleteAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionRetirementRuleModel,
    { isArray: true },
  )
  public retirementRules: SpecialRetirementRejectionRetirementRuleModel[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    SpecialRetirementRejectionCompleteAnalysisModel.name;
}
