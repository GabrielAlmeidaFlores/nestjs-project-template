import {
  CreditCardHolderInfoRequestDto,
  CreditCardInfoRequestDto,
} from '@module/customer/payment-plan/dto/request/credit-card.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PayBillingRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => CreditCardInfoRequestDto)
  public creditCardInfo: CreditCardInfoRequestDto;

  @RequestDtoObjectProperty(() => CreditCardHolderInfoRequestDto)
  public creditCardHolderInfo: CreditCardHolderInfoRequestDto;

  protected override readonly _type = PayBillingRequestDto.name;
}
