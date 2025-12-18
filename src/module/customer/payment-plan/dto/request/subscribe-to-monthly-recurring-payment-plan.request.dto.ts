import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreditCardInfoRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public holderName: string;

  @RequestDtoStringProperty()
  public number: string;

  @RequestDtoStringProperty()
  public expiryMonth: string;

  @RequestDtoStringProperty()
  public expiryYear: string;

  @RequestDtoStringProperty()
  public ccv: string;

  protected override readonly _type = CreditCardInfoRequestDto.name;
}

@RequestDto()
export class CreditCardHolderInfoRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoStringProperty()
  public email: string;

  @RequestDtoStringProperty()
  public federalDocument: string;

  @RequestDtoStringProperty()
  public postalCode: string;

  @RequestDtoStringProperty()
  public addressNumber: string;

  @RequestDtoStringProperty()
  public phoneNumber: string;

  protected override readonly _type = CreditCardHolderInfoRequestDto.name;
}

@RequestDto()
export class SubscribeToMonthlyRecurringPaymentPlanRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public paymentPlanId: string;

  @RequestDtoObjectProperty(() => CreditCardInfoRequestDto)
  public creditCardInfo: CreditCardInfoRequestDto;

  @RequestDtoObjectProperty(() => CreditCardHolderInfoRequestDto)
  public creditCardHolderInfo: CreditCardHolderInfoRequestDto;

  protected override readonly _type =
    SubscribeToMonthlyRecurringPaymentPlanRequestDto.name;
}
