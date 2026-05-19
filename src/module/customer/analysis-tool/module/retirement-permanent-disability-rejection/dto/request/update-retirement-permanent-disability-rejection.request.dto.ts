import { RetirementPermanentDisabilityRejectionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/enum/retirement-permanent-disability-rejection-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRetirementPermanentDisabilityRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public denialDate?: Date;

  @RequestDtoEnumProperty(RetirementPermanentDisabilityRejectionCategoryEnum, {
    required: false,
  })
  public category?: RetirementPermanentDisabilityRejectionCategoryEnum;

  protected override readonly _type =
    UpdateRetirementPermanentDisabilityRejectionRequestDto.name;
}
