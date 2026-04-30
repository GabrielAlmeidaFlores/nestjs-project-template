import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public totalContribution: string;

  @ResponseDtoStringProperty()
  public minimumGracePeriodRequired: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitTerminationResultInsuredStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public lastContributionDate: string;

  @ResponseDtoStringProperty()
  public disabilityStartDate: string;

  @ResponseDtoBooleanProperty()
  public gracePeriod: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationResultInsuredStatusResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitTerminationResultDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ isArray: true })
  public informedCids: string[];

  @ResponseDtoNumberProperty()
  public medicalDocumentsCount: number;

  @ResponseDtoStringProperty()
  public preliminaryAnalysis: string;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationResultDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitTerminationResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
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
    CreateTemporaryIncapacityBenefitTerminationResultRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitTerminationResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitTerminationId)
  public temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  @ResponseDtoBooleanProperty()
  public isEligibleForTemporaryIncapacityBenefit: boolean;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisResponseDto,
  )
  public gracePeriodAnalysis: CreateTemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitTerminationResultInsuredStatusResponseDto,
  )
  public insuredStatus: CreateTemporaryIncapacityBenefitTerminationResultInsuredStatusResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitTerminationResultDisabilityAnalysisResponseDto,
  )
  public disabilityAnalysis: CreateTemporaryIncapacityBenefitTerminationResultDisabilityAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitTerminationResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: CreateTemporaryIncapacityBenefitTerminationResultRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationResultResponseDto.name;
}
