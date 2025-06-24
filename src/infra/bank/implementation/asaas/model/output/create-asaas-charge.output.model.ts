import { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateAsaasChargeOutputModel {
  public id: string;
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public netValue: number;
  public dueDate: Date;
  public dateCreated: Date;
  public description: string;
  public externalReference: string;
  public discount: AsaasDiscountInputModel | null;

  protected readonly _type = CreateAsaasChargeOutputModel.name;

  public constructor(props: PublicPropertyType<CreateAsaasChargeOutputModel>) {
    this.id = props.id;
    this.customer = props.customer;
    this.billingType = props.billingType;
    this.value = props.value;
    this.netValue = props.netValue;
    this.dueDate = props.dueDate;
    this.dateCreated = props.dateCreated;
    this.description = props.description;
    this.externalReference = props.externalReference;
    this.discount = props.discount
      ? new AsaasDiscountInputModel(props.discount)
      : null;
  }
}
