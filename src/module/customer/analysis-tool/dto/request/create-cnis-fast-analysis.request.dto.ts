import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class CreateAnalysisToolClientRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @RequestDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @RequestDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @RequestDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public clientType?: AnalysisToolClientTypeEnum;

  protected override readonly _type =
    CreateAnalysisToolClientRequestDto.name;
}

@RequestDto()
export class CreateCnisFastAnalysisJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => CreateAnalysisToolClientRequestDto)
  public cnisFastAnalysisClient: CreateAnalysisToolClientRequestDto;

  @RequestDtoNumberProperty({ required: false, isArray: true })
  public legalProceedingNumber?: number[];

  @RequestDtoNumberProperty({ required: false, isArray: true })
  public inssBenefitNumber?: number[];

  protected override readonly _type = CreateCnisFastAnalysisJsonRequestDto.name;
}

@RequestDto()
export class CreateCnisFastAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public cnisDocument?: FileModel;

  @RequestDtoObjectProperty(() => CreateCnisFastAnalysisJsonRequestDto)
  public json: CreateCnisFastAnalysisJsonRequestDto;

  protected override readonly _type = CreateCnisFastAnalysisRequestDto.name;
}
