import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantResultPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public remuneration?: string;

  @ResponseDtoStringProperty({ required: false })
  public indicators?: string;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public contribution?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysis?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantResultPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantResultPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public periodId: string;

  @ResponseDtoObjectProperty(
    () =>
      CreateDisabilityRetirementPlanningGrantResultPeriodEarningsHistoryResponseDto,
    { isArray: true },
  )
  public earningsHistory: CreateDisabilityRetirementPlanningGrantResultPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantResultPeriodResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public retirementRuleName: string;

  @ResponseDtoBooleanProperty()
  public isEligible: boolean;

  @ResponseDtoDateProperty({ required: false })
  public eligibilityAvailableAt?: Date;

  @ResponseDtoNumberProperty()
  public expectedMonthlyBenefit: number;

  @ResponseDtoNumberProperty()
  public estimatedProcessValue: number;

  @ResponseDtoStringProperty()
  public retirementAnalysis: string;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantResultRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantResultSystemRecommendationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public optionName: string;

  @ResponseDtoStringProperty()
  public retirementRuleName: string;

  @ResponseDtoStringProperty()
  public dib: string;

  @ResponseDtoNumberProperty()
  public rmi: number;

  @ResponseDtoNumberProperty()
  public processValue: number;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantResultSystemRecommendationResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantResultProcessualStrategyResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public suggestionTitle: string;

  @ResponseDtoStringProperty()
  public suggestionDescription: string;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public bulletPoints?: string[];

  @ResponseDtoNumberProperty({ required: false })
  public successRatePercentageInSimilarCases?: number;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantResultProcessualStrategyResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantResultBenefitCompatibilityResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public benefit: string;

  @ResponseDtoBooleanProperty()
  public compatibility: boolean;

  @ResponseDtoStringProperty()
  public observations: string;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantResultBenefitCompatibilityResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      CreateDisabilityRetirementPlanningGrantResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: CreateDisabilityRetirementPlanningGrantResultRetirementRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      CreateDisabilityRetirementPlanningGrantResultSystemRecommendationResponseDto,
    { isArray: true },
  )
  public systemRecomendation: CreateDisabilityRetirementPlanningGrantResultSystemRecommendationResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      CreateDisabilityRetirementPlanningGrantResultProcessualStrategyResponseDto,
    { isArray: true },
  )
  public processualStrategy: CreateDisabilityRetirementPlanningGrantResultProcessualStrategyResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      CreateDisabilityRetirementPlanningGrantResultBenefitCompatibilityResponseDto,
  )
  public benefitCompatibility: CreateDisabilityRetirementPlanningGrantResultBenefitCompatibilityResponseDto;

  @ResponseDtoStringProperty()
  public analysisResult: string;

  @ResponseDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningGrantResultPeriodResponseDto,
    { isArray: true, required: false },
  )
  public periods?: CreateDisabilityRetirementPlanningGrantResultPeriodResponseDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantResultResponseDto.name;
}
