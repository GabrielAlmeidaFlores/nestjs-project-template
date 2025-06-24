import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { BankPaymentPlanCycleEnum } from '@infra/bank/enum/bank-payment-plan-cycle.enum';
import type { GetBankCreditCardHolderInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-holder-info.input.model';
import type { GetBankCreditCardInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-info.input.model';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankPaymentPlanInputModel {
  public customerId: string;
  public paymentMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public cycle: BankPaymentPlanCycleEnum;
  public description: string;
  public externalReference: string;
  public remoteIp: string;
  public creditCard: GetBankCreditCardInfoInputModel;
  public creditCardHolderInfo: GetBankCreditCardHolderInfoInputModel;
  public discountPercentage: number | null;

  protected readonly _type = CreateBankPaymentPlanInputModel.name;

  public constructor(
    props: PublicPropertyType<CreateBankPaymentPlanInputModel>,
  ) {
    this.customerId = props.customerId;
    this.paymentMethod = props.paymentMethod;
    this.value = props.value;
    this.cycle = props.cycle;
    this.description = props.description;
    this.externalReference = props.externalReference;
    this.remoteIp = props.remoteIp;
    this.creditCard = props.creditCard;
    this.creditCardHolderInfo = props.creditCardHolderInfo;
    this.discountPercentage = props.discountPercentage;
  }
}
