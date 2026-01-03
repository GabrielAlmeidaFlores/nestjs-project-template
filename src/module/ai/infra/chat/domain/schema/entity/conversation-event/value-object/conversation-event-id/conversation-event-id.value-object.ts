import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class ConversationEventId extends Guid {
  protected override readonly _type = ConversationEventId.name;
}
