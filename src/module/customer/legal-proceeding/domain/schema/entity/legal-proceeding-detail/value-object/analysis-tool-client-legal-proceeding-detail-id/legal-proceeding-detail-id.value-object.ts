import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class LegalProceedingDetailId extends Guid {
  protected override readonly _type = LegalProceedingDetailId.name;
}
