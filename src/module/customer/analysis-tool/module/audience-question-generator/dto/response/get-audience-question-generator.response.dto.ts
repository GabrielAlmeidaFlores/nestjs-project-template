import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAudienceQuestionGeneratorClientResponseDto extends BaseBuildableDtoObject {
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
    GetAudienceQuestionGeneratorClientResponseDto.name;
}

@ResponseDto()
export class GetAudienceQuestionGeneratorResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public audienceQuestionGeneratorCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public audienceQuestionGeneratorSimplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetAudienceQuestionGeneratorResultResponseDto.name;
}

@ResponseDto()
export class GetAudienceQuestionGeneratorResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetAudienceQuestionGeneratorResponsibleResponseDto.name;
}

@ResponseDto()
export class GetAudienceQuestionGeneratorDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetAudienceQuestionGeneratorDocumentResponseDto.name;
}

@ResponseDto()
export class GetAudienceQuestionGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AudienceQuestionGeneratorId)
  public id: AudienceQuestionGeneratorId;

  @ResponseDtoObjectProperty(
    () => GetAudienceQuestionGeneratorDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public audienceQuestionDocuments?:
    | GetAudienceQuestionGeneratorDocumentResponseDto[]
    | undefined;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetAudienceQuestionGeneratorClientResponseDto,
  )
  public analysisToolClient: GetAudienceQuestionGeneratorClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetAudienceQuestionGeneratorResultResponseDto,
    {
      required: false,
    },
  )
  public audienceQuestionGeneratorResult?: GetAudienceQuestionGeneratorResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAudienceQuestionGeneratorResponsibleResponseDto,
  )
  public createdBy: GetAudienceQuestionGeneratorResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAudienceQuestionGeneratorResponsibleResponseDto,
  )
  public updatedBy: GetAudienceQuestionGeneratorResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetAudienceQuestionGeneratorResponseDto.name;
}
