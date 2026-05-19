import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GetRetirementPermanentDisabilityRevisionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RetirementPermanentDisabilityRevisionId)
  public retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionRequestDto.name;
}
