import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantDependentDocumentId extends Guid {
  protected override readonly _type = DeathBenefitGrantDependentDocumentId.name;
}
