import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class ConversationMessageId extends Guid {
  protected override readonly _type = ConversationMessageId.name;
}
