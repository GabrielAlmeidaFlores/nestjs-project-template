import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentBenefitRejectionDocumentId extends Guid {
  protected override readonly _type = AccidentBenefitRejectionDocumentId.name;
}
