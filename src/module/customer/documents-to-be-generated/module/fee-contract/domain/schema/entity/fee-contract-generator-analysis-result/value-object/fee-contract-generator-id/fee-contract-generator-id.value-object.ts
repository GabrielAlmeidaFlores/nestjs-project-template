import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class FeeContractGeneratorId extends Guid {
  protected override readonly _type = FeeContractGeneratorId.name;
}
