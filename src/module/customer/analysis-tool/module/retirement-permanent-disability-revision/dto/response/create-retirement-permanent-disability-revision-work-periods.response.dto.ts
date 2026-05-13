import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPermanentDisabilityRevisionId)
  public retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;

  protected override readonly _type =
    CreateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto.name;
}
