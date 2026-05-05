import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateSpecialRetirementRejectionWorkPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementRejectionId)
  public specialRetirementRejectionId: SpecialRetirementRejectionId;

  protected override readonly _type =
    UpdateSpecialRetirementRejectionWorkPeriodsResponseDto.name;
}
