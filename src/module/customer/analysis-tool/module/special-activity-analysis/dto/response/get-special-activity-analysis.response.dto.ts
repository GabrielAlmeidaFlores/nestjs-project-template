import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import { SpecialActivityDocumentId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSpecialActivityClientResponseDto extends BaseBuildableDtoObject {
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

  protected override readonly _type = GetSpecialActivityClientResponseDto.name;
}

@ResponseDto()
export class GetSpecialActivityDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialActivityDocumentId)
  public id: SpecialActivityDocumentId;

  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public documentOriginalFileName: string;

  @ResponseDtoEnumProperty(SpecialActivityDocumentTypeEnum)
  public type: SpecialActivityDocumentTypeEnum;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialActivityDocumentResponseDto.name;
}

@ResponseDto()
export class GetSpecialActivityResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialActivityCompleteAnalysis?: object;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialActivitySimplifiedAnalysis?: object;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetSpecialActivityResultResponseDto.name;
}

@ResponseDto()
export class GetSpecialActivityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialActivityId)
  public id: SpecialActivityId;

  @ResponseDtoObjectProperty(() => GetSpecialActivityDocumentResponseDto, {
    isArray: true,
    required: false,
  })
  public documents?: GetSpecialActivityDocumentResponseDto[];

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetSpecialActivityClientResponseDto)
  public analysisToolClient: GetSpecialActivityClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(() => GetSpecialActivityResultResponseDto, {
    required: false,
  })
  public specialActivityResult?: GetSpecialActivityResultResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialActivityAnalysisResponseDto.name;
}
