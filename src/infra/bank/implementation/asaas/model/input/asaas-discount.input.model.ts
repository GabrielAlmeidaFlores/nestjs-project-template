import type { AsaasDiscountTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-discount-type.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class AsaasDiscountInputModel {
  public value: number;
  public dueDateLimitDays: number | null;
  public type: AsaasDiscountTypeEnum;

  protected readonly _type = AsaasDiscountInputModel.name;

  public constructor(props: PublicPropertyType<AsaasDiscountInputModel>) {
    this.value = props.value;
    this.dueDateLimitDays = props.dueDateLimitDays;
    this.type = props.type;
  }
}
