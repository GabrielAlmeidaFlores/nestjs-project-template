import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public totalContribution: string;

  @ResponseDtoStringProperty()
  public minimumGracePeriodRequired: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitRejectionResultInsuredStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public lastContributionDate: string;

  @ResponseDtoStringProperty()
  public disabilityStartDate: string;

  @ResponseDtoBooleanProperty()
  public gracePeriod: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionResultInsuredStatusResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitRejectionResultDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ isArray: true })
  public informedCids: string[];

  @ResponseDtoNumberProperty()
  public medicalDocumentsCount: number;

  @ResponseDtoStringProperty()
  public preliminaryAnalysis: string;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionResultDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitRejectionResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
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
    CreateTemporaryIncapacityBenefitRejectionResultRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryIncapacityBenefitRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitRejectionId)
  public temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  @ResponseDtoBooleanProperty()
  public isEligibleForTemporaryIncapacityBenefit: boolean;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisResponseDto,
  )
  public gracePeriodAnalysis: CreateTemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitRejectionResultInsuredStatusResponseDto,
  )
  public insuredStatus: CreateTemporaryIncapacityBenefitRejectionResultInsuredStatusResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitRejectionResultDisabilityAnalysisResponseDto,
  )
  public disabilityAnalysis: CreateTemporaryIncapacityBenefitRejectionResultDisabilityAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitRejectionResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: CreateTemporaryIncapacityBenefitRejectionResultRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionResultResponseDto.name;
}
