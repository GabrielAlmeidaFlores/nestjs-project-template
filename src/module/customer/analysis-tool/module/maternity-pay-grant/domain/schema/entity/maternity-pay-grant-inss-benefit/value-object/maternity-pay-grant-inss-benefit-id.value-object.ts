import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayGrantInssBenefitId extends Guid {
  protected override readonly _type = MaternityPayGrantInssBenefitId.name;
}
