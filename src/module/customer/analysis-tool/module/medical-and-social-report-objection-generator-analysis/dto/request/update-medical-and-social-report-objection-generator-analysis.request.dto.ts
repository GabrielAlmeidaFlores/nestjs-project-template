import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class UpdateMedicalAndSocialReportObjectionGeneratorAnalysisJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  protected override readonly _type =
    UpdateMedicalAndSocialReportObjectionGeneratorAnalysisJsonRequestDto.name;
}

@RequestDto()
export class UpdateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
    isArray: true,
  })
  public medicalExpertReport?: FileModel[];

  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
    isArray: true,
  })
  public legalCase?: FileModel[];

  @RequestDtoObjectProperty(
    () => UpdateMedicalAndSocialReportObjectionGeneratorAnalysisJsonRequestDto,
    { required: false },
  )
  public json?: UpdateMedicalAndSocialReportObjectionGeneratorAnalysisJsonRequestDto;

  protected override readonly _type =
    UpdateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto.name;
}
