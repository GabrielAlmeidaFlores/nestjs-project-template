import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PowerOfAttorneyGeneratorId extends Guid {
  protected override readonly _type = PowerOfAttorneyGeneratorId.name;
}
