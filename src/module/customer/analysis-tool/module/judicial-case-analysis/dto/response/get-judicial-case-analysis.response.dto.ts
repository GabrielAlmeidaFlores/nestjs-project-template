import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetJudicialCaseAnalysisClientResponseDto extends BaseBuildableDtoObject {
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
    GetJudicialCaseAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetJudicialCaseAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public clientLastAffiliationDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public judicialCaseCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public judicialCaseSimplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetJudicialCaseAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetJudicialCaseAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetJudicialCaseAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetJudicialCaseAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetJudicialCaseAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetJudicialCaseAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(JudicialCaseAnalysisId)
  public id: JudicialCaseAnalysisId;

  @ResponseDtoObjectProperty(() => GetJudicialCaseAnalysisDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public judicialCaseDocuments?:
    | GetJudicialCaseAnalysisDocumentResponseDto[]
    | undefined;

  @ResponseDtoObjectProperty(() => GetJudicialCaseAnalysisDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public otherDocuments?:
    | GetJudicialCaseAnalysisDocumentResponseDto[]
    | undefined;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetJudicialCaseAnalysisClientResponseDto)
  public analysisToolClient: GetJudicialCaseAnalysisClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(() => GetJudicialCaseAnalysisResultResponseDto, {
    required: false,
  })
  public judicialCaseAnalysisResult?: GetJudicialCaseAnalysisResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetJudicialCaseAnalysisResponsibleResponseDto,
  )
  public createdBy: GetJudicialCaseAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetJudicialCaseAnalysisResponsibleResponseDto,
  )
  public updatedBy: GetJudicialCaseAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetJudicialCaseAnalysisResponseDto.name;
}
