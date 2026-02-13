import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class DataCompareRetirementPlanningRgpsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RetirementPlanningRgpsId)
  public retirementPlanningRgpsId: RetirementPlanningRgpsId;

  protected override readonly _type =
    DataCompareRetirementPlanningRgpsRequestDto.name;
}

@RequestDto()
export class CompareRetirementPlanningRgpsCnisCtpsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    isArray: true,
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: true,
  })
  public files: FileModel[];

  @RequestDtoObjectProperty(() => DataCompareRetirementPlanningRgpsRequestDto)
  public json: DataCompareRetirementPlanningRgpsRequestDto;

  protected override readonly _type =
    CompareRetirementPlanningRgpsCnisCtpsRequestDto.name;
}
