import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPermanentDisabilityRejectionId)
  public retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId;

  protected override readonly _type =
    SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto.name;
}
