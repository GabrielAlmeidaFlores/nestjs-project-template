import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDisabilityRetirementPlanningRejectionResultClientDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public federalDocument: string;

  @ResponseDtoDateProperty({ required: false })
  public lastAffiliationDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoStringProperty()
  public gender: string;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningRejectionResultClientDataResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningRejectionResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public retirementRuleName: string;

  @ResponseDtoBooleanProperty()
  public isEligible: boolean;

  @ResponseDtoDateProperty({ required: false })
  public eligibilityAvailableAt?: Date;

  @ResponseDtoNumberProperty()
  public expectedMonthlyBenefit: number;

  @ResponseDtoBooleanProperty()
  public isBestRmi: boolean;

  @ResponseDtoBooleanProperty()
  public isHighestCauseValue: boolean;

  @ResponseDtoStringProperty()
  public retirementAnalysis: string;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningRejectionResultRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreateDisabilityRetirementPlanningRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      CreateDisabilityRetirementPlanningRejectionResultClientDataResponseDto,
  )
  public clientData: CreateDisabilityRetirementPlanningRejectionResultClientDataResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateDisabilityRetirementPlanningRejectionResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: CreateDisabilityRetirementPlanningRejectionResultRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningRejectionResultResponseDto.name;
}
