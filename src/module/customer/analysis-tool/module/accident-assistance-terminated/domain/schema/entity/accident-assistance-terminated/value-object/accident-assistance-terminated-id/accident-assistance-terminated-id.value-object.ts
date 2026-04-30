import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceTerminatedId extends Guid {
  protected override readonly _type = AccidentAssistanceTerminatedId.name;
}
