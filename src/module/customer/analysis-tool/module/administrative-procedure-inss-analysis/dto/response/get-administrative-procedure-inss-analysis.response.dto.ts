import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { AdministrativeProcedureInssAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/enum/administrative-procedure-inss-analysis-document-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAdministrativeProcedureInssAnalysisClientResponseDto extends BaseBuildableDtoObject {
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
    GetAdministrativeProcedureInssAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetAdministrativeProcedureInssAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public clientLastAffiliationDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public administrativeProcedureInssCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public administrativeProcedureInssSimplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetAdministrativeProcedureInssAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetAdministrativeProcedureInssAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(AdministrativeProcedureInssAnalysisDocumentTypeEnum)
  public type: AdministrativeProcedureInssAnalysisDocumentTypeEnum;

  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetAdministrativeProcedureInssAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AdministrativeProcedureInssAnalysisId)
  public id: AdministrativeProcedureInssAnalysisId;

  @ResponseDtoObjectProperty(
    () => GetAdministrativeProcedureInssAnalysisDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public administrativeProcedureDocuments?:
    | GetAdministrativeProcedureInssAnalysisDocumentResponseDto[]
    | undefined;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetAdministrativeProcedureInssAnalysisClientResponseDto,
  )
  public analysisToolClient: GetAdministrativeProcedureInssAnalysisClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetAdministrativeProcedureInssAnalysisResultResponseDto,
    {
      required: false,
    },
  )
  public administrativeProcedureInssAnalysisResult?: GetAdministrativeProcedureInssAnalysisResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAdministrativeProcedureInssAnalysisResponsibleResponseDto,
  )
  public createdBy: GetAdministrativeProcedureInssAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAdministrativeProcedureInssAnalysisResponsibleResponseDto,
  )
  public updatedBy: GetAdministrativeProcedureInssAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisResponseDto.name;
}
