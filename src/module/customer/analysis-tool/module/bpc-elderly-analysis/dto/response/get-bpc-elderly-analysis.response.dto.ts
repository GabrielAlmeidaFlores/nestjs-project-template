import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { BpcElderlyAnalysisCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/enum/bpc-elderly-analysis-category.enum';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/enum/bpc-elderly-analysis-document-type.enum';
import { BpcElderlyAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-income-type.enum';
import { BpcElderlyAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-kinship.enum';
import { BpcElderlyAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/enum/bpc-elderly-analysis-family-member-document-type.enum';
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
export class GetBpcElderlyAnalysisClientResponseDto extends BaseBuildableDtoObject {
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
    GetBpcElderlyAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public diagnosis?: string;

  @ResponseDtoNumberProperty({ required: false })
  public totalHouseholdIncome?: number;

  @ResponseDtoNumberProperty({ required: false })
  public perCapitaIncome?: number;

  @ResponseDtoStringProperty({ required: false })
  public eligibilityJustification?: string;

  @ResponseDtoStringProperty({ required: false })
  public type?: string;

  @ResponseDtoStringProperty({ required: false })
  public benefitStartDate?: string;

  @ResponseDtoNumberProperty({ required: false })
  public amount?: number;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetBpcElderlyAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetBpcElderlyAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcElderlyAnalysisDocumentTypeEnum)
  public type: BpcElderlyAnalysisDocumentTypeEnum;

  protected override readonly _type =
    GetBpcElderlyAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyAnalysisFamilyMemberDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(BpcElderlyAnalysisFamilyMemberDocumentTypeEnum)
  public type: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum;

  protected override readonly _type =
    GetBpcElderlyAnalysisFamilyMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyAnalysisFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fullName: string;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoEnumProperty(BpcElderlyAnalysisFamilyMemberKinshipEnum)
  public kinship: BpcElderlyAnalysisFamilyMemberKinshipEnum;

  @ResponseDtoBooleanProperty()
  public livesInSameResidence: boolean;

  @ResponseDtoBooleanProperty()
  public hasIncome: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public monthlyIncomeAmount?: number;

  @ResponseDtoEnumProperty(BpcElderlyAnalysisFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public incomeType?: BpcElderlyAnalysisFamilyMemberIncomeTypeEnum;

  @ResponseDtoObjectProperty(
    () => GetBpcElderlyAnalysisFamilyMemberDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetBpcElderlyAnalysisFamilyMemberDocumentResponseDto[];

  protected override readonly _type =
    GetBpcElderlyAnalysisFamilyMemberResponseDto.name;
}

@ResponseDto()
export class GetBpcElderlyAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BpcElderlyAnalysisId)
  public id: BpcElderlyAnalysisId;

  @ResponseDtoObjectProperty(() => GetBpcElderlyAnalysisDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public documents?: GetBpcElderlyAnalysisDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetBpcElderlyAnalysisFamilyMemberResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public familyMembers?: GetBpcElderlyAnalysisFamilyMemberResponseDto[];

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetBpcElderlyAnalysisClientResponseDto)
  public analysisToolClient: GetBpcElderlyAnalysisClientResponseDto;

  @ResponseDtoObjectProperty(() => GetBpcElderlyAnalysisResultResponseDto, {
    required: false,
  })
  public bpcElderlyAnalysisResult?: GetBpcElderlyAnalysisResultResponseDto;

  @ResponseDtoEnumProperty(BpcElderlyAnalysisCategoryEnum, {
    required: false,
  })
  public category?: BpcElderlyAnalysisCategoryEnum;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumbers?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @ResponseDtoObjectProperty(() => GetBpcElderlyAnalysisResponsibleResponseDto)
  public createdBy: GetBpcElderlyAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetBpcElderlyAnalysisResponsibleResponseDto)
  public updatedBy: GetBpcElderlyAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetBpcElderlyAnalysisResponseDto.name;
}
