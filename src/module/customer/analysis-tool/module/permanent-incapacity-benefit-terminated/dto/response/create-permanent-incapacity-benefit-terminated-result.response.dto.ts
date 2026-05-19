import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public totalContribution: string;

  @ResponseDtoStringProperty()
  public minimumGracePeriodRequired: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisResponseDto.name;
}

@ResponseDto()
export class CreatePermanentIncapacityBenefitTerminatedResultInsuredStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public lastContributionDate: string;

  @ResponseDtoStringProperty()
  public disabilityStartDate: string;

  @ResponseDtoBooleanProperty()
  public gracePeriod: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedResultInsuredStatusResponseDto.name;
}

@ResponseDto()
export class CreatePermanentIncapacityBenefitTerminatedResultDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ isArray: true })
  public informedCids: string[];

  @ResponseDtoNumberProperty()
  public medicalDocumentsCount: number;

  @ResponseDtoStringProperty()
  public preliminaryAnalysis: string;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedResultDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class CreatePermanentIncapacityBenefitTerminatedResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public modality: string;

  @ResponseDtoBooleanProperty()
  public isFulfilled: boolean;

  @ResponseDtoStringProperty({ required: false })
  public retirementDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public estimatedRmi?: string;

  @ResponseDtoStringProperty({ required: false })
  public estimatedCauseValue?: string;

  @ResponseDtoStringProperty()
  public detailedAnalysis: string;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedResultRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreatePermanentIncapacityBenefitTerminatedResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PermanentIncapacityBenefitTerminatedId)
  public permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  @ResponseDtoBooleanProperty()
  public isEligibleForPermanentIncapacityBenefit: boolean;

  @ResponseDtoObjectProperty(
    () =>
      CreatePermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisResponseDto,
  )
  public gracePeriodAnalysis: CreatePermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreatePermanentIncapacityBenefitTerminatedResultInsuredStatusResponseDto,
  )
  public insuredStatus: CreatePermanentIncapacityBenefitTerminatedResultInsuredStatusResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreatePermanentIncapacityBenefitTerminatedResultDisabilityAnalysisResponseDto,
  )
  public disabilityAnalysis: CreatePermanentIncapacityBenefitTerminatedResultDisabilityAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreatePermanentIncapacityBenefitTerminatedResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: CreatePermanentIncapacityBenefitTerminatedResultRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    CreatePermanentIncapacityBenefitTerminatedResultResponseDto.name;
}
