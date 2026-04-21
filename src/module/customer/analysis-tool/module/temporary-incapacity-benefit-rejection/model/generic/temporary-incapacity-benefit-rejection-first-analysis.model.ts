import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public event: string;

  @ResponseDtoStringProperty()
  public date: string;

  @ResponseDtoStringProperty()
  public observation: string;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel.name;
}

@ResponseDto()
export class TemporaryIncapacityBenefitRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public insuredStatus: boolean;

  @ResponseDtoStringProperty()
  public gracePeriodStatus: string;

  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel,
    { isArray: true },
  )
  public gracePeriods: TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel[];

  @ResponseDtoStringProperty()
  public analysisConclusion: string;

  @ResponseDtoBooleanProperty()
  public graceExtensionDueToInvoluntaryUnemployment: boolean;

  @ResponseDtoBooleanProperty()
  public requestToExtendGracePeriod: boolean;

  @ResponseDtoStringProperty()
  public contributionTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public contributionTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public contributionTimeWithAccelerators: string;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionFirstAnalysisModel.name;
}
