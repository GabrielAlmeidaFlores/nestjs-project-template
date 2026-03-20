import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementGrantResultId extends Guid {
  protected override readonly _type = GeneralUrbanRetirementGrantResultId.name;
}
