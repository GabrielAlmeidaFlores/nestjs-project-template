import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceTerminatedCidId extends Guid {
  protected override readonly _type = AccidentAssistanceTerminatedCidId.name;
}
