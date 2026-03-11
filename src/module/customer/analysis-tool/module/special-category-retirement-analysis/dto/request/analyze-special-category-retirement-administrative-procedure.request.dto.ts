import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class AnalyzeSpecialCategoryRetirementAdministrativeProcedureRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    isArray: true,
    required: true,
  })
  public files: FileModel[];

  protected override readonly _type =
    AnalyzeSpecialCategoryRetirementAdministrativeProcedureRequestDto.name;
}
