import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PovertyDeclarationGeneratorId extends Guid {
  protected override readonly _type = PovertyDeclarationGeneratorId.name;
}
