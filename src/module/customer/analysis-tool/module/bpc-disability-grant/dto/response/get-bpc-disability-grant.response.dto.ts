import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { BpcDisabilityGrantCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/enum/bpc-disability-grant-category.enum';
import { BpcDisabilityGrantDenialReasonEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/enum/bpc-disability-grant-denial-reason.enum';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/enum/bpc-disability-grant-document-type.enum';
import { BpcDisabilityGrantFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-income-type.enum';
import { BpcDisabilityGrantFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-kinship.enum';
import { BpcDisabilityGrantFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/enum/bpc-disability-grant-family-member-document-type.enum';
import { BpcDisabilityGrantRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant-result.response.dto';
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
export class GetBpcDisabilityGrantClientResponseDto extends BaseBuildableDtoObject {
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
    GetBpcDisabilityGrantClientResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public isElligibleForDisabilityBpc: boolean;

  @ResponseDtoStringProperty()
  public totalFamiliarIncome: string;

  @ResponseDtoStringProperty()
  public perCapitaIncome: string;

  @ResponseDtoBooleanProperty()
  public lessThanOneQuarter: boolean;

  @ResponseDtoBooleanProperty()
  public lessThanHalfAndAboveOneQuarter: boolean;

  @ResponseDtoBooleanProperty()
  public disabilityProven: boolean;

  @ResponseDtoObjectProperty(
    () => BpcDisabilityGrantRetirementRuleResponseDto,
    {
      isArray: true,
    },
  )
  public retirementRules: BpcDisabilityGrantRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetBpcDisabilityGrantResultResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityGrantResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetBpcDisabilityGrantResponsibleResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityGrantDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcDisabilityGrantDocumentTypeEnum)
  public type: BpcDisabilityGrantDocumentTypeEnum;

  protected override readonly _type =
    GetBpcDisabilityGrantDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityGrantFamilyMemberDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcDisabilityGrantFamilyMemberDocumentTypeEnum)
  public type: BpcDisabilityGrantFamilyMemberDocumentTypeEnum;

  protected override readonly _type =
    GetBpcDisabilityGrantFamilyMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityGrantFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fullName: string;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoEnumProperty(BpcDisabilityGrantFamilyMemberKinshipEnum)
  public kinship: BpcDisabilityGrantFamilyMemberKinshipEnum;

  @ResponseDtoBooleanProperty()
  public livesInSameResidence: boolean;

  @ResponseDtoBooleanProperty()
  public hasIncome: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public monthlyIncomeAmount?: number;

  @ResponseDtoEnumProperty(BpcDisabilityGrantFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public incomeType?: BpcDisabilityGrantFamilyMemberIncomeTypeEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasExpenseProofs?: boolean;

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityGrantFamilyMemberDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetBpcDisabilityGrantFamilyMemberDocumentResponseDto[];

  protected override readonly _type =
    GetBpcDisabilityGrantFamilyMemberResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcDisabilityGrantId)
  public id: BpcDisabilityGrantId;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetBpcDisabilityGrantClientResponseDto)
  public analysisToolClient: GetBpcDisabilityGrantClientResponseDto;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public requestedBenefitType?: string;

  @ResponseDtoEnumProperty(BpcDisabilityGrantCategoryEnum, {
    required: false,
  })
  public category?: BpcDisabilityGrantCategoryEnum;

  @ResponseDtoEnumProperty(BpcDisabilityGrantDenialReasonEnum, {
    required: false,
  })
  public denialReason?: BpcDisabilityGrantDenialReasonEnum;

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

  @ResponseDtoObjectProperty(() => GetBpcDisabilityGrantDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public documents?: GetBpcDisabilityGrantDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityGrantFamilyMemberResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public familyMembers?: GetBpcDisabilityGrantFamilyMemberResponseDto[];

  @ResponseDtoObjectProperty(() => GetBpcDisabilityGrantResultResponseDto, {
    required: false,
  })
  public BpcDisabilityGrantResult?: GetBpcDisabilityGrantResultResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumbers?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @ResponseDtoObjectProperty(() => GetBpcDisabilityGrantResponsibleResponseDto)
  public createdBy: GetBpcDisabilityGrantResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetBpcDisabilityGrantResponsibleResponseDto)
  public updatedBy: GetBpcDisabilityGrantResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetBpcDisabilityGrantResponseDto.name;
}
