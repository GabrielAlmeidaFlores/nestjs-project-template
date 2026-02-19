import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSpeechGeneratorClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public id: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type = GetSpeechGeneratorClientResponseDto.name;
}

@ResponseDto()
export class GetSpeechGeneratorResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public speechGeneratorCompleteContent?: string;

  @ResponseDtoStringProperty({ required: false })
  public speechGeneratorSimplifiedContent?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetSpeechGeneratorResultResponseDto.name;
}

@ResponseDto()
export class GetSpeechGeneratorResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetSpeechGeneratorResponsibleResponseDto.name;
}

@ResponseDto()
export class GetSpeechGeneratorDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetSpeechGeneratorDocumentResponseDto.name;
}

@ResponseDto()
export class GetSpeechGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpeechGeneratorId)
  public id: SpeechGeneratorId;

  @ResponseDtoObjectProperty(() => GetSpeechGeneratorDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public speechGeneratorDocuments?:
    | GetSpeechGeneratorDocumentResponseDto[]
    | undefined;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetSpeechGeneratorClientResponseDto)
  public analysisToolClient: GetSpeechGeneratorClientResponseDto;

  @ResponseDtoObjectProperty(() => GetSpeechGeneratorResultResponseDto, {
    required: false,
  })
  public speechGeneratorResult?: GetSpeechGeneratorResultResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoObjectProperty(() => GetSpeechGeneratorResponsibleResponseDto)
  public createdBy: GetSpeechGeneratorResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetSpeechGeneratorResponsibleResponseDto)
  public updatedBy: GetSpeechGeneratorResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetSpeechGeneratorResponseDto.name;
}
