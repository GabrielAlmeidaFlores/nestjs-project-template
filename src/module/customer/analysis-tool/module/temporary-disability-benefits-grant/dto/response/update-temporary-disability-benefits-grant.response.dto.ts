import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateTemporaryDisabilityBenefitsGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryDisabilityBenefitsGrantId)
  public temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantResponseDto.name;
}
