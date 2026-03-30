import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialRetirementGrantCnisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantId)
  public specialRetirementGrantId: SpecialRetirementGrantId;

  protected override readonly _type =
    CreateSpecialRetirementGrantCnisResponseDto.name;
}
