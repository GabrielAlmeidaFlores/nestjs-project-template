import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentBenefitRejectionEventDocumentId extends Guid {
  protected override readonly _type = AccidentBenefitRejectionEventDocumentId.name;
}
