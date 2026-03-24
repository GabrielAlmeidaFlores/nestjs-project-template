import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PurchaseCreditPackRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(CreditPackId)
  public creditPackId: CreditPackId;

  protected override readonly _type = PurchaseCreditPackRequestDto.name;
}
