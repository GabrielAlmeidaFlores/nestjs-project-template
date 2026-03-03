import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/enum/per-capita-income-for-bpc-analysis-document-type.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-income-type.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-kinship.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/enum/per-capita-income-for-bpc-analysis-family-member-document-type.enum';
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
export class GetPerCapitaIncomeForBpcAnalysisClientResponseDto extends BaseBuildableDtoObject {
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
    GetPerCapitaIncomeForBpcAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetPerCapitaIncomeForBpcAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetPerCapitaIncomeForBpcAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(PerCapitaIncomeForBpcAnalysisDocumentTypeEnum)
  public type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum,
  )
  public type: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetPerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fullName: string;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoEnumProperty(PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum)
  public kinship: PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum;

  @ResponseDtoBooleanProperty()
  public livesInSameResidence: boolean;

  @ResponseDtoBooleanProperty()
  public hasIncome: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public monthlyIncomeAmount?: number;

  @ResponseDtoEnumProperty(
    PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum,
    { required: false },
  )
  public incomeType?: PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum;

  @ResponseDtoObjectProperty(
    () => GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentResponseDto[];

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto.name;
}

@ResponseDto()
export class GetPerCapitaIncomeForBpcAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PerCapitaIncomeForBpcAnalysisId)
  public id: PerCapitaIncomeForBpcAnalysisId;

  @ResponseDtoObjectProperty(
    () => GetPerCapitaIncomeForBpcAnalysisDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetPerCapitaIncomeForBpcAnalysisDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetPerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public familyMembers?: GetPerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto[];

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetPerCapitaIncomeForBpcAnalysisClientResponseDto,
  )
  public analysisToolClient: GetPerCapitaIncomeForBpcAnalysisClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetPerCapitaIncomeForBpcAnalysisResultResponseDto,
    {
      required: false,
    },
  )
  public perCapitaIncomeForBpcAnalysisResult?: GetPerCapitaIncomeForBpcAnalysisResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto,
  )
  public createdBy: GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto,
  )
  public updatedBy: GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisResponseDto.name;
}
