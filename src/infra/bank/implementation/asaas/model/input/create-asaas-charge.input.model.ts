import { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateAsaasChargeInputModel {
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public dueDate: Date;
  public description: string;
  public externalReference: string;
  public discount: AsaasDiscountInputModel | null;
  public installmentCount: number | null;

  protected readonly _type = CreateAsaasChargeInputModel.name;

  public constructor(props: PublicPropertyType<CreateAsaasChargeInputModel>) {
    this.customer = props.customer;
    this.billingType = props.billingType;
    this.value = props.value;
    this.dueDate = props.dueDate;
    this.description = props.description;
    this.externalReference = props.externalReference;
    this.installmentCount = props.installmentCount;
    this.discount = props.discount
      ? new AsaasDiscountInputModel(props.discount)
      : null;
  }
}
