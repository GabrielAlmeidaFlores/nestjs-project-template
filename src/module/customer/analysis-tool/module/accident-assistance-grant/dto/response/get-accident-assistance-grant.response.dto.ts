import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AccidentAssistanceGrantCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/enum/accident-assistance-grant-category.enum';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';
import { AccidentAssistanceGrantDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/value-object/accident-assistance-grant-document-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAccidentAssistanceGrantClientResponseDto extends BaseBuildableDtoObject {
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
    GetAccidentAssistanceGrantClientResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public firstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetAccidentAssistanceGrantResultResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceGrantDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentAssistanceGrantDocumentId)
  public accidentAssistanceGrantDocumentId: AccidentAssistanceGrantDocumentId;

  @ResponseDtoEnumProperty(AccidentAssistanceGrantDocumentTypeEnum, {
    required: false,
  })
  public type?: AccidentAssistanceGrantDocumentTypeEnum;

  protected override readonly _type =
    GetAccidentAssistanceGrantDocumentResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentAssistanceGrantId)
  public accidentAssistanceGrantId: AccidentAssistanceGrantId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(AccidentAssistanceGrantCategoryEnum, {
    required: false,
  })
  public category?: AccidentAssistanceGrantCategoryEnum;

  @ResponseDtoDateProperty({ required: false })
  public accidentDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public hadPreviousTemporaryDisabilityAssistance?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public sequelDescription?: string;

  @ResponseDtoStringProperty({ required: false })
  public associatedCidId?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceGrantClientResponseDto,
    {
      required: false,
    },
  )
  public client?: GetAccidentAssistanceGrantClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceGrantResultResponseDto,
    { required: false },
  )
  public result?: GetAccidentAssistanceGrantResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceGrantDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetAccidentAssistanceGrantDocumentResponseDto[];

  protected override readonly _type =
    GetAccidentAssistanceGrantResponseDto.name;
}
