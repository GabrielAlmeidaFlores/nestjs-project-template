import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export class ConversationQueryParam extends ListDataInputModel {
  public customerId: CustomerId;

  public title?: string | null = null;

  protected override readonly _type = ConversationQueryParam.name;

  public constructor(props: Partial<ConversationQueryParam>) {
    super(props);

    const customerId = props.customerId;

    if (customerId === undefined) {
      throw new Error('ConversationQueryParam.customerId is required.');
    }

    this.customerId = customerId;
    this.title = props.title ?? null;
  }
}
