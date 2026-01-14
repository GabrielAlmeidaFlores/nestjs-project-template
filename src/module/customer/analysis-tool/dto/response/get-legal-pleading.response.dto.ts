import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import { LegalPleadingSocialSecurityObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-objective.enum';
import { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import { LegalPleadingWritOfMandamusObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-writ-of-mandamus-objective.enum';
import { BenefitNumber } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import { LegalPleadingCode } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetLegalPleadingResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public legalPleadingCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public legalPleadingSimplifiedAnalysis?: string;

  protected override readonly _type = GetLegalPleadingResultResponseDto.name;
}

@ResponseDto()
export class GetLegalPleadingDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type = GetLegalPleadingDocumentResponseDto.name;
}

@ResponseDto()
export class GetLegalPleadingDocumentAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public analysis?: string;

  @ResponseDtoEnumProperty(LegalPleadingDocumentTypeEnum)
  public type: LegalPleadingDocumentTypeEnum;

  @ResponseDtoObjectProperty(() => GetLegalPleadingDocumentResponseDto, {
    isArray: true,
  })
  public legalPleadingDocument: GetLegalPleadingDocumentResponseDto[];

  protected override readonly _type =
    GetLegalPleadingDocumentAnalysisResponseDto.name;
}

@ResponseDto()
export class GetLegalPleadingClientResponseDto extends BaseBuildableDtoObject {
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

  protected override readonly _type = GetLegalPleadingClientResponseDto.name;
}

@ResponseDto()
export class GetLegalPleadingResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetLegalPleadingResponsibleResponseDto.name;
}

@ResponseDto()
export class GetLegalPleadingAddressDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public city: string;

  @ResponseDtoStringProperty()
  public neighborhood: string;

  @ResponseDtoStringProperty()
  public street: string;

  @ResponseDtoEnumProperty(StateCodeEnum)
  public stateCode: StateCodeEnum;

  @ResponseDtoValueObjectProperty(PostalCode)
  public postalCode: PostalCode;

  @ResponseDtoNumberProperty()
  public addressNumber: number;

  protected override readonly _type =
    GetLegalPleadingAddressDataResponseDto.name;
}

@ResponseDto()
export class GetLegalPleadingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(LegalPleadingId)
  public id: LegalPleadingId;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoValueObjectProperty(LegalPleadingCode)
  public code: LegalPleadingCode;

  @ResponseDtoStringProperty({ required: false })
  public statementOfFacts?: string;

  @ResponseDtoStringProperty({ required: false })
  public additionalComments?: string;

  @ResponseDtoEnumProperty(LegalPleadingSocialSecuritySystemEnum, {
    required: false,
  })
  public securitySystem?: LegalPleadingSocialSecuritySystemEnum;

  @ResponseDtoEnumProperty(LegalPleadingBenefitTypeEnum, { required: false })
  public benefitType?: LegalPleadingBenefitTypeEnum;

  @ResponseDtoEnumProperty(LegalPleadingPetitionTypeEnum, { required: false })
  public petitionType?: LegalPleadingPetitionTypeEnum;

  @ResponseDtoValueObjectProperty(BenefitNumber, { required: false })
  public benefitNumber?: BenefitNumber;

  @ResponseDtoDateProperty({ required: false })
  public applicationSubmissionDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public benefitTerminationDate?: Date;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public benefitInitialMonthlyIncome?: DecimalValue;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public benefitCurrentMonthlyIncome?: DecimalValue;

  @ResponseDtoEnumProperty(LegalPleadingSocialSecurityObjectiveEnum, {
    required: false,
  })
  public socialSecurityObjective?: LegalPleadingSocialSecurityObjectiveEnum;

  @ResponseDtoEnumProperty(LegalPleadingWritOfMandamusObjectiveEnum, {
    required: false,
  })
  public legalPleadingWritOfMandamusObjective?: LegalPleadingWritOfMandamusObjectiveEnum;

  @ResponseDtoObjectProperty(() => GetLegalPleadingClientResponseDto)
  public analysisToolClient: GetLegalPleadingClientResponseDto;

  @ResponseDtoObjectProperty(() => GetLegalPleadingAddressDataResponseDto, {
    required: false,
  })
  public legalPleadingAddress?: GetLegalPleadingAddressDataResponseDto;

  @ResponseDtoObjectProperty(
    () => GetLegalPleadingDocumentAnalysisResponseDto,
    { isArray: true },
  )
  public legalPleadingDocumentAnalysis: GetLegalPleadingDocumentAnalysisResponseDto[];

  @ResponseDtoObjectProperty(() => GetLegalPleadingResultResponseDto, {
    required: false,
  })
  public legalPleadingResult?: GetLegalPleadingResultResponseDto;

  @ResponseDtoObjectProperty(() => GetLegalPleadingResponsibleResponseDto)
  public createdBy: GetLegalPleadingResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetLegalPleadingResponsibleResponseDto)
  public updatedBy: GetLegalPleadingResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetLegalPleadingResponseDto.name;
}
