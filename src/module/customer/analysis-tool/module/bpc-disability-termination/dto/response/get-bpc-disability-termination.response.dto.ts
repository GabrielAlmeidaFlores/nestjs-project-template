import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { BpcDisabilityTerminationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-category.enum';
import { BpcDisabilityTerminationDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-degree.enum';
import { BpcDisabilityTerminationDisabilityTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-type.enum';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/enum/bpc-disability-termination-document-type.enum';
import { BpcDisabilityTerminationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-income-type.enum';
import { BpcDisabilityTerminationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-kinship.enum';
import { BpcDisabilityTerminationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/enum/bpc-disability-termination-family-member-document-type.enum';
import {
  BpcDisabilityTerminationApplicableRuleResponseDto,
  BpcDisabilityTerminationBenefitSummaryResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-result.response.dto';
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
export class GetBpcDisabilityTerminationClientResponseDto extends BaseBuildableDtoObject {
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
    GetBpcDisabilityTerminationClientResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysisDownload?: string;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisDetailedText?: string;

  @ResponseDtoObjectProperty(
    () => BpcDisabilityTerminationApplicableRuleResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public applicableRules?: BpcDisabilityTerminationApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => BpcDisabilityTerminationBenefitSummaryResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public benefitSummaries?: BpcDisabilityTerminationBenefitSummaryResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetBpcDisabilityTerminationResultResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetBpcDisabilityTerminationResponsibleResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcDisabilityTerminationDocumentTypeEnum)
  public type: BpcDisabilityTerminationDocumentTypeEnum;

  protected override readonly _type =
    GetBpcDisabilityTerminationDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationFamilyMemberDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcDisabilityTerminationFamilyMemberDocumentTypeEnum)
  public type: BpcDisabilityTerminationFamilyMemberDocumentTypeEnum;

  protected override readonly _type =
    GetBpcDisabilityTerminationFamilyMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fullName: string;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoEnumProperty(BpcDisabilityTerminationFamilyMemberKinshipEnum)
  public kinship: BpcDisabilityTerminationFamilyMemberKinshipEnum;

  @ResponseDtoBooleanProperty()
  public livesInSameResidence: boolean;

  @ResponseDtoBooleanProperty()
  public hasIncome: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public monthlyIncomeAmount?: number;

  @ResponseDtoEnumProperty(BpcDisabilityTerminationFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public incomeType?: BpcDisabilityTerminationFamilyMemberIncomeTypeEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasExpenseProofs?: boolean;

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationFamilyMemberDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetBpcDisabilityTerminationFamilyMemberDocumentResponseDto[];

  protected override readonly _type =
    GetBpcDisabilityTerminationFamilyMemberResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationDisabilityAssessmentDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetBpcDisabilityTerminationDisabilityAssessmentDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationDisabilityAssessmentResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationDisabilityAssessmentDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetBpcDisabilityTerminationDisabilityAssessmentDocumentResponseDto[];

  protected override readonly _type =
    GetBpcDisabilityTerminationDisabilityAssessmentResponseDto.name;
}

@ResponseDto()
export class GetBpcDisabilityTerminationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcDisabilityTerminationId)
  public id: BpcDisabilityTerminationId;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetBpcDisabilityTerminationClientResponseDto)
  public analysisToolClient: GetBpcDisabilityTerminationClientResponseDto;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(BpcDisabilityTerminationCategoryEnum, {
    required: false,
  })
  public category?: BpcDisabilityTerminationCategoryEnum;

  @ResponseDtoEnumProperty(BpcDisabilityTerminationDisabilityTypeEnum, {
    required: false,
  })
  public disabilityType?: BpcDisabilityTerminationDisabilityTypeEnum;

  @ResponseDtoEnumProperty(BpcDisabilityTerminationDisabilityDegreeEnum, {
    required: false,
  })
  public disabilityDegree?: BpcDisabilityTerminationDisabilityDegreeEnum;

  @ResponseDtoStringProperty({ required: false })
  public benefitCessationReason?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public livesAlone?: boolean;

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetBpcDisabilityTerminationDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationFamilyMemberResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public familyMembers?: GetBpcDisabilityTerminationFamilyMemberResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationDisabilityAssessmentResponseDto,
    {
      required: false,
    },
  )
  public disabilityAssessment?: GetBpcDisabilityTerminationDisabilityAssessmentResponseDto;

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationResultResponseDto,
    {
      required: false,
    },
  )
  public bpcDisabilityTerminationResult?: GetBpcDisabilityTerminationResultResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumbers?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationResponsibleResponseDto,
  )
  public createdBy: GetBpcDisabilityTerminationResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetBpcDisabilityTerminationResponsibleResponseDto,
  )
  public updatedBy: GetBpcDisabilityTerminationResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetBpcDisabilityTerminationResponseDto.name;
}
