import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly event: string;

  @ResponseDtoStringProperty()
  public readonly date: string;

  @ResponseDtoStringProperty()
  public readonly observation: string;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel.name;
}

@ResponseDto()
export class TemporaryDisabilityBenefitsGrantFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly insuredStatus: boolean;

  @ResponseDtoBooleanProperty()
  public readonly gracePeriodStatus: boolean;

  @ResponseDtoObjectProperty(
    () => TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel,
    { isArray: true },
  )
  public readonly gracePeriods: TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel[];

  @ResponseDtoStringProperty()
  public readonly analysisConclusion: string;

  @ResponseDtoBooleanProperty()
  public readonly graceExtensionDueToInvoluntaryUnemployment: boolean;

  @ResponseDtoBooleanProperty()
  public readonly requestToExtendGracePeriod: boolean;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantFirstAnalysisModel.name;
}
