import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentAssistanceTerminatedPeriodDocumentId extends Guid {
  protected override readonly _type =
    AccidentAssistanceTerminatedPeriodDocumentId.name;
}
