import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public id: AnalysisToolClientId;

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
    GetMedicalAndSocialReportObjectionGeneratorAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public medicalAndSocialReportObjectionGeneratorCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoStringProperty()
  public type: string;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    MedicalAndSocialReportObjectionGeneratorAnalysisId,
  )
  public id: MedicalAndSocialReportObjectionGeneratorAnalysisId;

  @ResponseDtoObjectProperty(
    () =>
      GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public medicalAndSocialReportObjectionGeneratorAnalysisDocuments?:
    | GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentResponseDto[]
    | undefined;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetMedicalAndSocialReportObjectionGeneratorAnalysisClientResponseDto,
  )
  public analysisToolClient: GetMedicalAndSocialReportObjectionGeneratorAnalysisClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto,
    {
      required: false,
    },
  )
  public medicalAndSocialReportObjectionGeneratorAnalysisResult?: GetMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto,
  )
  public createdBy: GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto,
  )
  public updatedBy: GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto.name;
}
