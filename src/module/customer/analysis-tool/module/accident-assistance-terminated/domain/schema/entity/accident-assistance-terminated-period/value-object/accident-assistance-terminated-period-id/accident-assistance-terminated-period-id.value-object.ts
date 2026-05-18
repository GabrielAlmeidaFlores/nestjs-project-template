import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceTerminatedPeriodId extends Guid {
  protected override readonly _type = AccidentAssistanceTerminatedPeriodId.name;
}
