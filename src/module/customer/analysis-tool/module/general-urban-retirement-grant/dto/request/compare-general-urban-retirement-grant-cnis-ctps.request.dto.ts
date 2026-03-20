import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class DataCompareGeneralUrbanRetirementGrantCnisCtpsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantId)
  public generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId;

  protected override readonly _type =
    DataCompareGeneralUrbanRetirementGrantCnisCtpsRequestDto.name;
}

@RequestDto()
export class CompareGeneralUrbanRetirementGrantCnisCtpsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    isArray: true,
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: true,
  })
  public files: FileModel[];

  @RequestDtoObjectProperty(
    () => DataCompareGeneralUrbanRetirementGrantCnisCtpsRequestDto,
  )
  public json: DataCompareGeneralUrbanRetirementGrantCnisCtpsRequestDto;

  protected override readonly _type =
    CompareGeneralUrbanRetirementGrantCnisCtpsRequestDto.name;
}
