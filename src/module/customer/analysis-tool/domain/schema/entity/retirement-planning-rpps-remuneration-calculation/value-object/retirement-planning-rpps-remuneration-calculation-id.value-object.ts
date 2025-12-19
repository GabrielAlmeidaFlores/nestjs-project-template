import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRppsRemunerationCalculationId extends Guid {
  protected override readonly _type =
    RetirementPlanningRppsRemunerationCalculationId.name;

  public constructor(value?: string) {
    super(value);
  }
}
