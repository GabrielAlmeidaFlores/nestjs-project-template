import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class DataCreateGeneralUrbanRetirementGrantCnisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantId)
  public generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId;

  protected override readonly _type =
    DataCreateGeneralUrbanRetirementGrantCnisRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementGrantCnisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: true,
  })
  public cnisDocument: FileModel;

  @RequestDtoObjectProperty(
    () => DataCreateGeneralUrbanRetirementGrantCnisRequestDto,
  )
  public json: DataCreateGeneralUrbanRetirementGrantCnisRequestDto;

  protected override readonly _type =
    CreateGeneralUrbanRetirementGrantCnisRequestDto.name;
}
