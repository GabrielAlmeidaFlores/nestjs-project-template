import { AsaasCreditCardHolderInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-holder-info.input.model';
import { AsaasCreditCardInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-info.input.model';
import { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { AsaasSubscriptionCycleEnum } from '@infra/bank/implementation/asaas/enum/asaas-subscription-cycle.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateAsaasSubscriptionInputModel {
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public cycle: AsaasSubscriptionCycleEnum;
  public description: string;
  public remoteIp: string;
  public creditCard: AsaasCreditCardInfoInputModel;
  public creditCardHolderInfo: AsaasCreditCardHolderInfoInputModel;
  public discount: AsaasDiscountInputModel | null;

  protected readonly _type = CreateAsaasSubscriptionInputModel.name;

  public constructor(
    props: PublicPropertyType<CreateAsaasSubscriptionInputModel>,
  ) {
    this.customer = props.customer;
    this.billingType = props.billingType;
    this.value = props.value;
    this.cycle = props.cycle;
    this.description = props.description;
    this.remoteIp = props.remoteIp;
    this.creditCard = new AsaasCreditCardInfoInputModel(props.creditCard);
    this.creditCardHolderInfo = new AsaasCreditCardHolderInfoInputModel(
      props.creditCardHolderInfo,
    );
    this.discount = props.discount
      ? new AsaasDiscountInputModel(props.discount)
      : null;
  }
}
