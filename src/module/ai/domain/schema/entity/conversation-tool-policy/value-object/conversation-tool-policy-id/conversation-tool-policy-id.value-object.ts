import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class ConversationToolPolicyId extends Guid {
  protected override readonly _type = ConversationToolPolicyId.name;
}
