import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionDependentDocumentId extends Guid {
  protected override readonly _type =
    DeathBenefitRejectionDependentDocumentId.name;
}
