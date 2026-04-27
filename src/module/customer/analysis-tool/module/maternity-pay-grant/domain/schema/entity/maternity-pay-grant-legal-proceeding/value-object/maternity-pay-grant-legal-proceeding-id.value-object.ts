import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayGrantLegalProceedingId extends Guid {
  protected override readonly _type = MaternityPayGrantLegalProceedingId.name;
}
