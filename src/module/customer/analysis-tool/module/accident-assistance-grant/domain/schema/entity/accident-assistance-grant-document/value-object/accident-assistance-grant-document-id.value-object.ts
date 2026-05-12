import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceGrantDocumentId extends Guid {
  protected override readonly _type = AccidentAssistanceGrantDocumentId.name;
}
