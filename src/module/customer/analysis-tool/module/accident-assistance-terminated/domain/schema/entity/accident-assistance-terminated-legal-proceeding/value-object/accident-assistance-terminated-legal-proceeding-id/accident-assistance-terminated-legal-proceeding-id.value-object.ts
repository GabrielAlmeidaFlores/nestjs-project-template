import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceTerminatedLegalProceedingId extends Guid {
  protected override readonly _type =
    AccidentAssistanceTerminatedLegalProceedingId.name;
}
