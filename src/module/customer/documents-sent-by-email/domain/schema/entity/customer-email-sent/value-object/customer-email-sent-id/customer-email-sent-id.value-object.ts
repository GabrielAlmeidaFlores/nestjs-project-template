import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CustomerEmailSentId extends Guid {
  protected override readonly _type = CustomerEmailSentId.name;
}
