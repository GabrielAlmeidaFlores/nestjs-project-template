import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public totalContribution: string;

  @ResponseDtoStringProperty()
  public minimumGracePeriodRequired: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsTerminatedResultInsuredStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public lastContributionDate: string;

  @ResponseDtoStringProperty()
  public disabilityStartDate: string;

  @ResponseDtoBooleanProperty()
  public gracePeriod: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedResultInsuredStatusResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ isArray: true })
  public informedCids: string[];

  @ResponseDtoNumberProperty()
  public medicalDocumentsCount: number;

  @ResponseDtoStringProperty()
  public preliminaryAnalysis: string;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsTerminatedResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
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
    CreateTemporaryDisabilityBenefitsTerminatedResultRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryDisabilityBenefitsTerminatedId)
  public temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  @ResponseDtoBooleanProperty()
  public isEligibleForTemporaryIncapacityBenefit: boolean;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisResponseDto,
  )
  public gracePeriodAnalysis: CreateTemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedResultInsuredStatusResponseDto,
  )
  public insuredStatus: CreateTemporaryDisabilityBenefitsTerminatedResultInsuredStatusResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisResponseDto,
  )
  public disabilityAnalysis: CreateTemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: CreateTemporaryDisabilityBenefitsTerminatedResultRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto.name;
}
