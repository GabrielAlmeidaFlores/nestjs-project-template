import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class ConversationId extends Guid {
  protected override readonly _type = ConversationId.name;
}
