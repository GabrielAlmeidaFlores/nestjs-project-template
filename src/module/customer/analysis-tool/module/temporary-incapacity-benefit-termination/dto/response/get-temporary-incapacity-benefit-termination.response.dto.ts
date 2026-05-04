import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import { TemporaryIncapacityBenefitTerminationReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-reason.enum';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/enum/temporary-incapacity-benefit-termination-severe-disease.enum';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/enum/temporary-incapacity-benefit-termination-disability-analysis-document-type.enum';
import { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-period-consideration.enum';
import { TemporaryIncapacityBenefitTerminationFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/generic/temporary-incapacity-benefit-termination-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { TemporaryIncapacityBenefitTerminationResultInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/interface/temporary-incapacity-benefit-termination-result.interface';

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public corporateEmail?: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @ResponseDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public clientType?: AnalysisToolClientTypeEnum;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitTerminationFirstAnalysisModel,
    { required: false },
  )
  public temporaryIncapacityBenefitTerminationFirstAnalysis?: TemporaryIncapacityBenefitTerminationFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public temporaryIncapacityBenefitTerminationCompleteAnalysis?: TemporaryIncapacityBenefitTerminationResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public temporaryIncapacityBenefitTerminationSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public temporaryIncapacityBenefitTerminationCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationResultResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationDocumentTypeEnum,
  )
  public type: TemporaryIncapacityBenefitTerminationDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public cidTenId: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisCidResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum,
  )
  public type: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public estimatedDisabilityStartDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public shortDisabilityDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public disabilityFromAccident?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public disablingConditionDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public disabilityFromSevereDisease?: boolean;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: TemporaryIncapacityBenefitTerminationSevereDiseaseEnum;

  @ResponseDtoStringProperty({ required: false })
  public diseaseCustomName?: string;

  @ResponseDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public needsConstantAssistanceFromAnotherPerson?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public previousDisabilityBenefit?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public previousBenefitNumber?: string;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisCidResponseDto,
    { isArray: true, required: false },
  )
  public cids?: GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisCidResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentResponseDto[];

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationInsuredStatusDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationInsuredStatusDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty({ required: false })
  public involuntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public intentionToProveInvoluntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public ruralInsuredClient?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public documentsDescription?: string;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitTerminationInsuredStatusDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryIncapacityBenefitTerminationInsuredStatusDocumentResponseDto[];

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitTerminationCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitTerminationCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryResponseDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GetTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitTerminationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitTerminationId)
  public temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public benefitTerminationDate?: Date;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitTerminationCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitTerminationCategoryEnum;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitTerminationReasonEnum, {
    required: false,
  })
  public terminationReason?: TemporaryIncapacityBenefitTerminationReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public terminationReasonDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitTerminationAnalysisToolClientResponseDto,
  )
  public analysisToolClient: GetTemporaryIncapacityBenefitTerminationAnalysisToolClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitTerminationResultResponseDto,
    { required: false },
  )
  public temporaryIncapacityBenefitTerminationResult?: GetTemporaryIncapacityBenefitTerminationResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitTerminationDocumentResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitTerminationDocument?: GetTemporaryIncapacityBenefitTerminationDocumentResponseDto[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitTerminationDisabilityAnalysis?: GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitTerminationInsuredStatus?: GetTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitTerminationWorkPeriods?: GetTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitTerminationResponseDto.name;
}
