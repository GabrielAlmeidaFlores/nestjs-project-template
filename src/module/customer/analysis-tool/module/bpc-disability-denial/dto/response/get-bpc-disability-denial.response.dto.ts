import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { BpcDisabilityDenialCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-category.enum';
import { BpcDisabilityDenialDenialReasonEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-denial-reason.enum';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/enum/bpc-disability-denial-document-type.enum';
import { BpcDisabilityDenialFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-income-type.enum';
import { BpcDisabilityDenialFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-kinship.enum';
import { BpcDisabilityDenialFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/enum/bpc-disability-denial-family-member-document-type.enum';
import {
  BpcDisabilityDenialApplicableRuleResponseDto,
  BpcDisabilityDenialBenefitSummaryResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-result.response.dto';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetBpcDisabilityDenialClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public id: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @ResponseDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public clientType?: AnalysisToolClientTypeEnum;

  protected override readonly _type =
    GetBpcDisabilityDenialClientResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityDenialResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public firstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysisDownload?: string;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisDetailedText?: string;

  @ResponseDtoObjectProperty(
    () => BpcDisabilityDenialApplicableRuleResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public applicableRules?: BpcDisabilityDenialApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => BpcDisabilityDenialBenefitSummaryResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public benefitSummaries?: BpcDisabilityDenialBenefitSummaryResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetBpcDisabilityDenialResultResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityDenialResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetBpcDisabilityDenialResponsibleResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityDenialDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcDisabilityDenialDocumentTypeEnum)
  public type: BpcDisabilityDenialDocumentTypeEnum;

  protected override readonly _type =
    GetBpcDisabilityDenialDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityDenialFamilyMemberDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcDisabilityDenialFamilyMemberDocumentTypeEnum)
  public type: BpcDisabilityDenialFamilyMemberDocumentTypeEnum;

  protected override readonly _type =
    GetBpcDisabilityDenialFamilyMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityDenialFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fullName: string;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoEnumProperty(BpcDisabilityDenialFamilyMemberKinshipEnum)
  public kinship: BpcDisabilityDenialFamilyMemberKinshipEnum;

  @ResponseDtoBooleanProperty()
  public livesInSameResidence: boolean;

  @ResponseDtoBooleanProperty()
  public hasIncome: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public monthlyIncomeAmount?: number;

  @ResponseDtoEnumProperty(BpcDisabilityDenialFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public incomeType?: BpcDisabilityDenialFamilyMemberIncomeTypeEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasExpenseProofs?: boolean;

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityDenialFamilyMemberDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetBpcDisabilityDenialFamilyMemberDocumentResponseDto[];

  protected override readonly _type =
    GetBpcDisabilityDenialFamilyMemberResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityDenialResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcDisabilityDenialId)
  public id: BpcDisabilityDenialId;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetBpcDisabilityDenialClientResponseDto)
  public analysisToolClient: GetBpcDisabilityDenialClientResponseDto;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public requestedBenefitType?: string;

  @ResponseDtoEnumProperty(BpcDisabilityDenialCategoryEnum, {
    required: false,
  })
  public category?: BpcDisabilityDenialCategoryEnum;

  @ResponseDtoEnumProperty(BpcDisabilityDenialDenialReasonEnum, {
    required: false,
  })
  public denialReason?: BpcDisabilityDenialDenialReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public denialReasonDescription?: string;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningPeriodDisabilityCategoryEnum,
    { required: false },
  )
  public disabilityType?: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;

  @ResponseDtoEnumProperty(RetirementPlanningDisabilityDegreeEnum, {
    required: false,
  })
  public disabilityDegree?: RetirementPlanningDisabilityDegreeEnum;

  @ResponseDtoDateProperty({ required: false })
  public estimatedDisabilityStartDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public attendsSchoolOrTechnicalCourse?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public performsLaborActivity?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public needsThirdPartyHelp?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasAccessToBasicServices?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public otherBarriersDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public livesAlone?: boolean;

  @ResponseDtoObjectProperty(() => GetBpcDisabilityDenialDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public documents?: GetBpcDisabilityDenialDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityDenialFamilyMemberResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public familyMembers?: GetBpcDisabilityDenialFamilyMemberResponseDto[];

  @ResponseDtoObjectProperty(() => GetBpcDisabilityDenialResultResponseDto, {
    required: false,
  })
  public bpcDisabilityDenialResult?: GetBpcDisabilityDenialResultResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumbers?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @ResponseDtoObjectProperty(() => GetBpcDisabilityDenialResponsibleResponseDto)
  public createdBy: GetBpcDisabilityDenialResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetBpcDisabilityDenialResponsibleResponseDto)
  public updatedBy: GetBpcDisabilityDenialResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetBpcDisabilityDenialResponseDto.name;
}
