import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AdministrativeRequestGeneratorId extends Guid {
  protected override readonly _type = AdministrativeRequestGeneratorId.name;
}
