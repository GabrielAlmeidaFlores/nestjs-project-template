import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AccidentBenefitRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly insuredStatusMantained: boolean;

  @ResponseDtoStringProperty()
  public readonly insuredStatusAnalysisConclusion: string;

  @ResponseDtoBooleanProperty()
  public readonly presenceOfPermanentSequelae: boolean;

  @ResponseDtoBooleanProperty()
  public readonly compatibilityOfTheSequelaeWithAccident: boolean;

  @ResponseDtoStringProperty()
  public readonly sequelaeAnalysisConclusion: string;

  protected override readonly _type =
    AccidentBenefitRejectionFirstAnalysisModel.name;
}
