import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralOrHybridRetirementRejectionPeriodMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionPeriodMemberResponseDto.name;
}
