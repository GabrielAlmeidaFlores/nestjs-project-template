import { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { AsaasSubscriptionCycleEnum } from '@infra/bank/implementation/asaas/enum/asaas-subscription-cycle.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateAsaasSubscriptionOutputModel {
  public id: string;
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public cycle: AsaasSubscriptionCycleEnum;
  public description: string;
  public discount: AsaasDiscountInputModel | null;

  protected readonly _type = CreateAsaasSubscriptionOutputModel.name;

  public constructor(
    props: PublicPropertyType<CreateAsaasSubscriptionOutputModel>,
  ) {
    this.id = props.id;
    this.customer = props.customer;
    this.billingType = props.billingType;
    this.value = props.value;
    this.cycle = props.cycle;
    this.description = props.description;
    this.discount = props.discount
      ? new AsaasDiscountInputModel(props.discount)
      : null;
  }
}
