import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class JefWaiverDeclarationGeneratorId extends Guid {
  protected override readonly _type = JefWaiverDeclarationGeneratorId.name;
}
