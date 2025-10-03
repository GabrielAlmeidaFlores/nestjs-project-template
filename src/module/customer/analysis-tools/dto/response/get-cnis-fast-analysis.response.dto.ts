import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CnisFastAnalysisClientTypeEnum } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client/enum/cnis-fast-analysis-client-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetCnisFastAnalysisClientResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoNumberProperty({ required: false, isArray: true })
  public legalProceedingNumber?: number[];

  @ResponseDtoNumberProperty({ required: false, isArray: true })
  public inssBenefitNumber?: number[];

  @ResponseDtoEnumProperty(CnisFastAnalysisClientTypeEnum, { required: false })
  public clientType?: CnisFastAnalysisClientTypeEnum;

  protected override readonly _type = GetCnisFastAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetCnisFastAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public clientLastAffiliationDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public cnisAiAnalysis?: string;
  protected override readonly _type = GetCnisFastAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetCnisFastAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  @ResponseDtoStringProperty({ required: false })
  public cnisAiAnalysis?: string;
  protected override readonly _type =
    GetCnisFastAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetCnisFastAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    required: false,
  })
  public cnisDocument?: string;

  @ResponseDtoObjectProperty(() => GetCnisFastAnalysisClientResponseDto)
  public cnisFastAnalysisClient: GetCnisFastAnalysisClientResponseDto;

  @ResponseDtoObjectProperty(() => GetCnisFastAnalysisResultResponseDto, {
    required: false,
  })
  public cnisFastAnalysisResult?: GetCnisFastAnalysisResultResponseDto;

  @ResponseDtoObjectProperty(() => GetCnisFastAnalysisResponsibleResponseDto)
  public createdBy: GetCnisFastAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetCnisFastAnalysisResponsibleResponseDto)
  public updatedBy: GetCnisFastAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetCnisFastAnalysisResponseDto.name;
}
