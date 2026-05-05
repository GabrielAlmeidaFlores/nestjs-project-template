import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceTerminatedDocumentId extends Guid {
  protected override readonly _type =
    AccidentAssistanceTerminatedDocumentId.name;
}
