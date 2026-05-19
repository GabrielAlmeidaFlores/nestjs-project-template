import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateTemporaryDisabilityBenefitsTerminatedResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryDisabilityBenefitsTerminatedId)
  public temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsTerminatedResponseDto.name;
}
