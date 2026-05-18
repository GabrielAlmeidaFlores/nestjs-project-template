import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { BpcElderlyCessationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-category.enum';
import { BpcElderlyCessationCessationReasonEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-cessation-reason.enum';
import { BpcElderlyCessationCivilStatusEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-civil-status.enum';
import { BpcElderlyCessationEducationLevelEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-education-level.enum';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/enum/bpc-elderly-cessation-document-type.enum';
import { BpcElderlyCessationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-income-type.enum';
import { BpcElderlyCessationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-kinship.enum';
import { BpcElderlyCessationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/enum/bpc-elderly-cessation-family-member-document-type.enum';
import {
  BpcElderlyCessationApplicableRuleResponseDto,
  BpcElderlyCessationBenefitSummaryResponseDto,
} from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-result.response.dto';
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
export class GetBpcElderlyCessationClientResponseDto extends BaseBuildableDtoObject {
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
    GetBpcElderlyCessationClientResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyCessationResultResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoStringProperty({ required: false })
  public diagnosis?: string;

  @ResponseDtoNumberProperty({ required: false })
  public totalHouseholdIncome?: number;

  @ResponseDtoNumberProperty({ required: false })
  public perCapitaIncome?: number;

  @ResponseDtoStringProperty({ required: false })
  public legalRequirementsMet?: string;

  @ResponseDtoStringProperty({ required: false })
  public perCapitaIncomeBelowQuarterMinimumWage?: string;

  @ResponseDtoStringProperty({ required: false })
  public ageEqualOrAbove65Years?: string;

  @ResponseDtoObjectProperty(
    () => BpcElderlyCessationApplicableRuleResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public applicableRules?: BpcElderlyCessationApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => BpcElderlyCessationBenefitSummaryResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public benefitSummaries?: BpcElderlyCessationBenefitSummaryResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetBpcElderlyCessationResultResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyCessationResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetBpcElderlyCessationResponsibleResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyCessationDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcElderlyCessationDocumentTypeEnum)
  public type: BpcElderlyCessationDocumentTypeEnum;

  protected override readonly _type =
    GetBpcElderlyCessationDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyCessationFamilyMemberDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcElderlyCessationFamilyMemberDocumentTypeEnum)
  public type: BpcElderlyCessationFamilyMemberDocumentTypeEnum;

  protected override readonly _type =
    GetBpcElderlyCessationFamilyMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyCessationFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fullName: string;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoEnumProperty(BpcElderlyCessationFamilyMemberKinshipEnum)
  public kinship: BpcElderlyCessationFamilyMemberKinshipEnum;

  @ResponseDtoBooleanProperty()
  public livesInSameResidence: boolean;

  @ResponseDtoBooleanProperty()
  public hasIncome: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public monthlyIncomeAmount?: number;

  @ResponseDtoEnumProperty(BpcElderlyCessationFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public incomeType?: BpcElderlyCessationFamilyMemberIncomeTypeEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasExpenseProofs?: boolean;

  @ResponseDtoObjectProperty(
    () => GetBpcElderlyCessationFamilyMemberDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetBpcElderlyCessationFamilyMemberDocumentResponseDto[];

  protected override readonly _type =
    GetBpcElderlyCessationFamilyMemberResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyCessationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcElderlyCessationId)
  public id: BpcElderlyCessationId;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetBpcElderlyCessationClientResponseDto)
  public analysisToolClient: GetBpcElderlyCessationClientResponseDto;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public decisionDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public previousInssBenefitNumber?: string;

  @ResponseDtoEnumProperty(BpcElderlyCessationCategoryEnum, {
    required: false,
  })
  public category?: BpcElderlyCessationCategoryEnum;

  @ResponseDtoEnumProperty(BpcElderlyCessationCessationReasonEnum, {
    required: false,
  })
  public cessationReason?: BpcElderlyCessationCessationReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public cessationReasonDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isAppealDeadlineExpired?: boolean;

  @ResponseDtoEnumProperty(BpcElderlyCessationCivilStatusEnum, {
    required: false,
  })
  public civilStatus?: BpcElderlyCessationCivilStatusEnum;

  @ResponseDtoEnumProperty(BpcElderlyCessationEducationLevelEnum, {
    required: false,
  })
  public educationLevel?: BpcElderlyCessationEducationLevelEnum;

  @ResponseDtoStringProperty({ required: false })
  public currentAddress?: string;

  @ResponseDtoStringProperty({ required: false })
  public previousAddress?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public hasAddressChangedSinceDecision?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public livesAlone?: boolean;

  @ResponseDtoObjectProperty(() => GetBpcElderlyCessationDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public documents?: GetBpcElderlyCessationDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetBpcElderlyCessationFamilyMemberResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public familyMembers?: GetBpcElderlyCessationFamilyMemberResponseDto[];

  @ResponseDtoObjectProperty(() => GetBpcElderlyCessationResultResponseDto, {
    required: false,
  })
  public bpcElderlyCessationResult?: GetBpcElderlyCessationResultResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumbers?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @ResponseDtoObjectProperty(() => GetBpcElderlyCessationResponsibleResponseDto)
  public createdBy: GetBpcElderlyCessationResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetBpcElderlyCessationResponsibleResponseDto)
  public updatedBy: GetBpcElderlyCessationResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetBpcElderlyCessationResponseDto.name;
}
