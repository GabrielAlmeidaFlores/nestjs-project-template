import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SurvivorPensionAnalysisBenefitOriginatorIdentificationId extends Guid {
  protected override readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationId.name;
}
