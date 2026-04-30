import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SpecialRetirementRejectionFirstAnalysisWorkPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public bondOrigin: string;

  @ResponseDtoStringProperty()
  public startDate: string;

  @ResponseDtoStringProperty()
  public endDate: string;

  @ResponseDtoStringProperty()
  public category: string;

  @ResponseDtoStringProperty({ isArray: true })
  public pendencyReason: string[];

  @ResponseDtoStringProperty()
  public periodConsideration: string;

  @ResponseDtoStringProperty()
  public contributionAverage: string;

  @ResponseDtoStringProperty()
  public status: string;

  @ResponseDtoStringProperty()
  public gracePeriod: string;

  @ResponseDtoStringProperty()
  public activityType: string;

  protected override readonly _type =
    SpecialRetirementRejectionFirstAnalysisWorkPeriodModel.name;
}

@ResponseDto()
export class SpecialRetirementRejectionFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public decisionAnalysis: string;

  @ResponseDtoStringProperty()
  public specialTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialTimeWithAccelerators: string;

  @ResponseDtoStringProperty()
  public commonTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonTimeWithAccelerators: string;

  @ResponseDtoStringProperty()
  public totalTimeWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalTimeResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalTimeWithAccelerators: string;

  @ResponseDtoStringProperty()
  public specialGracePeriodWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialGracePeriodResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public specialGracePeriodWithAccelerators: string;

  @ResponseDtoStringProperty()
  public commonGracePeriodWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonGracePeriodResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public commonGracePeriodWithAccelerators: string;

  @ResponseDtoStringProperty()
  public totalGracePeriodWithoutResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalGracePeriodResolvingPendencies: string;

  @ResponseDtoStringProperty()
  public totalGracePeriodWithAccelerators: string;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionFirstAnalysisWorkPeriodModel,
    { isArray: true },
  )
  public workPeriods: SpecialRetirementRejectionFirstAnalysisWorkPeriodModel[];

  protected override readonly _type =
    SpecialRetirementRejectionFirstAnalysisModel.name;
}
