import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { QuickCnisAnalysisClientTypeEnum } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/enum/quick-cnis-analysis-client-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { FileModel } from '@shared/system/model/generic/file.model';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@RequestDto()
export class CreateCnisFastAnalysisClientRequestDto extends BaseBuildableObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: string;

  @RequestDtoValueObjectProperty(Email, { required: false })
  public email?: string;

  @RequestDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: string;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @RequestDtoEnumProperty(QuickCnisAnalysisClientTypeEnum, { required: false })
  public clientType?: QuickCnisAnalysisClientTypeEnum;

  protected override readonly _type =
    CreateCnisFastAnalysisClientRequestDto.name;
}

@RequestDto()
export class CreateCnisFastAnalysisJsonRequestDto extends BaseBuildableObject {
  @RequestDtoObjectProperty(() => CreateCnisFastAnalysisClientRequestDto)
  public cnisFastAnalysisClient: CreateCnisFastAnalysisClientRequestDto;

  protected override readonly _type = CreateCnisFastAnalysisJsonRequestDto.name;
}

@RequestDto()
export class CreateCnisFastAnalysisRequestDto extends BaseBuildableObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public cnisDocument?: FileModel;

  @RequestDtoObjectProperty(() => CreateCnisFastAnalysisJsonRequestDto)
  public json: CreateCnisFastAnalysisJsonRequestDto;

  protected override readonly _type = CreateCnisFastAnalysisRequestDto.name;
}
