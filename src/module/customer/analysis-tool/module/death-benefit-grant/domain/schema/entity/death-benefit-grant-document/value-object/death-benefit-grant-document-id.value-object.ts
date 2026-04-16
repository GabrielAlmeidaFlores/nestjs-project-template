import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantDocumentId extends Guid {
  protected override readonly _type = DeathBenefitGrantDocumentId.name;
}
