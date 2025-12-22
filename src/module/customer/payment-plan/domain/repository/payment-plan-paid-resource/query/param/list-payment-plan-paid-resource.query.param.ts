import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

export class ListPaymentPlanPaidResourceQueryParam extends ListDataInputModel {
  public searchBy: string | null;
  public resource: PaymentPlanPaidResourceTypeEnum | null;

  protected override readonly _type =
    ListPaymentPlanPaidResourceQueryParam.name;

  public constructor(props: Partial<ListPaymentPlanPaidResourceQueryParam>) {
    super(props);

    this.searchBy = props.searchBy ?? null;
    this.resource = props.resource ?? null;
  }
}
