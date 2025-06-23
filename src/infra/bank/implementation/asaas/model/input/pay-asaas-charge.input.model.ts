import { AsaasCreditCardHolderInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-holder-info.input.model';
import { AsaasCreditCardInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-info.input.model';

import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class PayAsaasChargeInputModel {
  public creditCard: AsaasCreditCardInfoInputModel;
  public creditCardHolderInfo: AsaasCreditCardHolderInfoInputModel;

  protected readonly _type = PayAsaasChargeInputModel.name;

  public constructor(props: PublicPropertyType<PayAsaasChargeInputModel>) {
    this.creditCard = new AsaasCreditCardInfoInputModel(props.creditCard);
    this.creditCardHolderInfo = new AsaasCreditCardHolderInfoInputModel(
      props.creditCardHolderInfo,
    );
  }
}
