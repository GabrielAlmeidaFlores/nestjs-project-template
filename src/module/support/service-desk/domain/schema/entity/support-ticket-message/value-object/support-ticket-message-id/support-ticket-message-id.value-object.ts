import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SupportTicketMessageId extends Guid {
  protected override readonly _type = SupportTicketMessageId.name;
}
