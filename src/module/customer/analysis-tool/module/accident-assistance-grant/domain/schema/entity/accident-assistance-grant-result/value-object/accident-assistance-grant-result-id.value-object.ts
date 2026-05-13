import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceGrantResultId extends Guid {
  protected override readonly _type = AccidentAssistanceGrantResultId.name;
}
