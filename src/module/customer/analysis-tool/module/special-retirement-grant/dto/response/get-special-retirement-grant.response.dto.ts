import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSpecialRetirementGrantClientResponseDto extends BaseBuildableDtoObject {
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
    GetSpecialRetirementGrantClientResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantDocumentId)
  public id: string;

  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public documentOriginalFileName: string;

  @ResponseDtoEnumProperty(SpecialRetirementGrantDocumentTypeEnum)
  public type: SpecialRetirementGrantDocumentTypeEnum;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantDocumentResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialRetirementGrantCompleteAnalysis?: object;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialRetirementGrantSimplifiedAnalysis?: object;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantResultResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantId)
  public id: SpecialRetirementGrantId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoBooleanProperty()
  public specialActivity: boolean;

  @ResponseDtoStringProperty()
  public cnisDocument: string;

  @ResponseDtoStringProperty()
  public cnisDocumentOriginalFileName: string;

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementGrantDocumentResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public documents?: GetSpecialRetirementGrantDocumentResponseDto[];

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetSpecialRetirementGrantClientResponseDto)
  public analysisToolClient: GetSpecialRetirementGrantClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(() => GetSpecialRetirementGrantResultResponseDto, {
    required: false,
  })
  public specialRetirementGrantResult?: GetSpecialRetirementGrantResultResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetSpecialRetirementGrantResponseDto.name;
}
