import { RetirementDocumentTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/enum/retirement-document-type-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AddSpecialCategoryRetirementAnalysisPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RetirementDocumentTypeCategoryEnum)
  public retirementDocumentTypeCategory: RetirementDocumentTypeCategoryEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type =
    AddSpecialCategoryRetirementAnalysisPeriodDocumentRequestDto.name;
}
