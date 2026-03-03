import { DisabilityRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/disability-retirement-planning-activity-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DisabilityRetirementPlanningTimelinePeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly startDate: string;

  @ResponseDtoStringProperty()
  public readonly endDate: string;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningActivityTypeEnum)
  public readonly activityType: DisabilityRetirementPlanningActivityTypeEnum;

  @ResponseDtoStringProperty()
  public readonly location: string;

  protected override readonly _type =
    DisabilityRetirementPlanningTimelinePeriodModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningRetirementOptionModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly retirementRuleName: string;

  @ResponseDtoBooleanProperty()
  public readonly isEligible: boolean;

  @ResponseDtoStringProperty({ required: false })
  public readonly eligibilityAvailableAt?: string;

  @ResponseDtoNumberProperty()
  public readonly expectedMonthlyBenefit: number;

  @ResponseDtoBooleanProperty()
  public readonly isBestMonthlyBenefit: boolean;

  @ResponseDtoBooleanProperty()
  public readonly hasHighestAdvantageValue: boolean;

  @ResponseDtoStringProperty()
  public readonly retirementAnalysis: string;

  protected override readonly _type =
    DisabilityRetirementPlanningRetirementOptionModel.name;
}

@ResponseDto()
export class DisabilityRetirementPlanningCompleteAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningTimelinePeriodModel,
    { isArray: true },
  )
  public readonly timeline: DisabilityRetirementPlanningTimelinePeriodModel[];

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningRetirementOptionModel,
    { isArray: true },
  )
  public readonly retirementOptionsSummary: DisabilityRetirementPlanningRetirementOptionModel[];

  @ResponseDtoStringProperty()
  public readonly analysisResult: string;

  @ResponseDtoStringProperty()
  public readonly disabilityTime: string;

  @ResponseDtoStringProperty()
  public readonly commonTime: string;

  @ResponseDtoStringProperty()
  public readonly totalContributionTime: string;

  @ResponseDtoStringProperty()
  public readonly positionTenureTime: string;

  @ResponseDtoStringProperty()
  public readonly publicServiceTime: string;

  @ResponseDtoStringProperty()
  public readonly totalCareerTime: string;

  @ResponseDtoStringProperty()
  public readonly insuredAge: string;

  @ResponseDtoStringProperty()
  public readonly publicServiceStartDate: string;

  protected override readonly _type =
    DisabilityRetirementPlanningCompleteAnalysisModel.name;
}
