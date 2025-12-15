import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export class CountLegalProceedingDetailQueryParam extends ListDataInputModel {
  public readonly customerId: CustomerId | null;

  protected override readonly _type = CountLegalProceedingDetailQueryParam.name;

  public constructor(props: Partial<CountLegalProceedingDetailQueryParam>) {
    super(props);

    this.customerId = props.customerId ?? null;
  }
}
