import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayRejectionLegalProceedingId extends Guid {
  protected override readonly _type =
    MaternityPayRejectionLegalProceedingId.name;
}
